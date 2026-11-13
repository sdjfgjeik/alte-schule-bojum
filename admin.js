import "./admin.css";
import { supabase, supabaseConfigured } from "./src/supabase.js";

const sections = [
  ["global:header", "Kopfzeile – alle Seiten", "index.html", "site-header"],
  ["global:footer", "Fußzeile – alle Seiten", "index.html", "site-footer"],
  ["home", "Startseite", "index.html", "main"],
  ["zuhause", "Unser Zuhause", "zuhause.html", "main"],
  ["facts", "Auf einen Blick", "auf-einen-blick.html", "main"],
  ["paedagogik", "Pädagogik", "paedagogik.html", "main"],
  ["aufnahme", "Zielgruppe und Aufnahme", "aufnahme.html", "main"],
  ["ueber-uns", "Über uns", "ueber-uns.html", "main"],
  ["philosophie", "Philosophie", "philosophie.html", "main"],
  ["team", "Team", "team.html", "main"],
  ["kontakt", "Kontakt", "kontakt.html", "main"],
  ["impressum", "Impressum", "impressum.html", "main"],
  ["datenschutz", "Datenschutz", "datenschutz.html", "main"],
];

const element = (selector) => document.querySelector(selector);
const authPanel = element("#auth-panel");
const editorShell = element("#editor-shell");
const authStatus = element("#auth-status");
const editorStatus = element("#editor-status");
const authSubmit = element("#auth-submit");
const publishButton = element("#publish-page");
const saveButton = element("#save-draft");
const pageSelect = element("#page-select");
const sourceFrame = element("#preview-source");
let editor;
let currentSession;
let activeSection;
let sourceLoad;
let lastCheckedSessionId;
let editorPromise;

function showStatus(target, message, error = false) {
  target.textContent = message;
  target.setAttribute("data-error", String(error));
}

function requireSupabase() {
  if (!supabaseConfigured || !supabase) {
    showStatus(authStatus, "Supabase ist noch nicht konfiguriert. Lokale Umgebungsvariablen prüfen und den Entwicklungsserver neu starten.", true);
    return false;
  }
  return true;
}

function configureEditor(grapesjs) {
  editor = grapesjs.init({
    container: "#gjs",
    height: "100%",
    storageManager: false,
    selectorManager: { componentFirst: true },
    canvas: { styles: [`${import.meta.env.BASE_URL}site.css`] },
    layerManager: { appendTo: "#layers-panel" },
    styleManager: {
      appendTo: "#styles-panel",
      sectors: [
        { name: "Größe und Abstand", open: true, properties: ["display", "width", "height", "min-height", "padding", "margin"] },
        { name: "Typografie", open: false, properties: ["font-family", "font-size", "font-weight", "color", "line-height", "text-align"] },
        { name: "Hintergrund und Rahmen", open: false, properties: ["background-color", "border", "border-radius", "box-shadow"] },
        { name: "Layout", open: false, properties: ["flex-direction", "justify-content", "align-items", "grid-template-columns", "gap"] },
      ],
    },
    blockManager: { appendTo: "#blocks-panel" },
    panels: { defaults: [] },
    protectedCss: "*",
  });

  editor.BlockManager.add("section", {
    label: "Abschnitt",
    category: "Grundelemente",
    content: '<section class="section"><div class="wrap"><h2>Neue Überschrift</h2><p>Text hier bearbeiten.</p></div></section>',
  });
  editor.BlockManager.add("text", {
    label: "Text",
    category: "Grundelemente",
    content: '<div class="wrap"><p>Text hier bearbeiten.</p></div>',
  });
  editor.BlockManager.add("image", {
    label: "Bild",
    category: "Grundelemente",
    content: `<figure class="image-frame"><img src="${import.meta.env.BASE_URL}images/optimized/haus/bojum-haus-im-freien.jpg" alt="Außenansicht des Hauses der Alten Schule Bojum"></figure>`,
  });
  editor.BlockManager.add("button", {
    label: "Button",
    category: "Grundelemente",
    content: '<a class="button" href="kontakt.html">Linktext</a>',
  });
}

async function initializeEditor() {
  if (editor) return;
  if (!editorPromise) {
    editorPromise = Promise.all([
      import("grapesjs"),
      import("grapesjs/dist/css/grapes.min.css"),
    ]).then(([{ default: grapesjs }]) => configureEditor(grapesjs));
  }
  await editorPromise;

  document.querySelectorAll("[data-editor-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-editor-panel]").forEach((item) => item.classList.toggle("is-active", item === button));
      document.querySelectorAll(".editor-panel").forEach((panel) => panel.classList.toggle("is-active", panel.id === `${button.dataset.editorPanel}-panel`));
    });
  });
}

function loadSourceFrame(section) {
  sourceLoad?.(null);
  let resolveLoad;
  const pending = new Promise((resolve) => { resolveLoad = resolve; });
  sourceLoad = resolveLoad;
  const deadline = Date.now() + 15000;
  const finish = (html) => {
    if (sourceLoad === resolveLoad) sourceLoad = null;
    resolveLoad(html);
  };
  const check = () => {
    const sourceDocument = sourceFrame.contentDocument;
    const source = sourceDocument?.getElementById(section[3]);
    if (source && (source.id !== "main" || source.childElementCount > 0)) {
      finish(source.innerHTML);
    } else if (Date.now() >= deadline) {
      finish(null);
    } else {
      window.setTimeout(check, 50);
    }
  };
  sourceFrame.onload = () => {
    check();
  };
  sourceFrame.src = `/${section[2]}`;
  return pending;
}

async function loadSection(section) {
  activeSection = section;
  showStatus(editorStatus, "Bereich wird geladen …");
  publishButton.disabled = true;
  saveButton.disabled = true;
  const [recordResult, fallbackHtml] = await Promise.all([
    supabase.from("site_pages").select("draft_project,draft_html,draft_css,published_html,published_css,published").eq("page_id", section[0]).maybeSingle(),
    loadSourceFrame(section),
  ]);
  if (recordResult.error) {
    showStatus(editorStatus, `Inhalte konnten nicht geladen werden: ${recordResult.error.message}`, true);
    return;
  }
  const record = recordResult.data;
  if (record?.draft_project) editor.loadProjectData(record.draft_project);
  else editor.setComponents(record?.draft_html || record?.published_html || fallbackHtml || "<section class=\"section\"><div class=\"wrap\"><h2>Neuer Abschnitt</h2></div></section>");
  editor.setStyle(record?.draft_css || record?.published_css || "");
  publishButton.disabled = false;
  saveButton.disabled = false;
  showStatus(editorStatus, record?.published ? "Entwurf geladen. Veröffentlichen aktualisiert die Live-Seite." : "Entwurf geladen. Noch nicht veröffentlichte Bereiche bleiben online unverändert.");
}

async function checkAdmin(session) {
  const sessionId = session?.user.id || null;
  if (sessionId === lastCheckedSessionId && (sessionId ? !editorShell.hidden : authPanel.hidden)) return;
  lastCheckedSessionId = sessionId;
  currentSession = session;
  if (!session) {
    authPanel.hidden = false;
    editorShell.hidden = true;
    element("#account-area").hidden = true;
    return;
  }
  const { data, error } = await supabase.from("site_admins").select("email").eq("email", session.user.email.toLowerCase()).maybeSingle();
  if (error) {
    showStatus(authStatus, `Adminfreigabe konnte nicht geprüft werden: ${error.message}. SQL-Migration und RLS-Einstellungen prüfen.`, true);
    return;
  }
  if (!data) {
    await supabase.auth.signOut();
    showStatus(authStatus, "Dieses Konto ist nicht als Website-Admin freigeschaltet. Die Admin-E-Mail muss in Supabase freigegeben sein.", true);
    return;
  }
  authPanel.hidden = true;
  editorShell.hidden = false;
  element("#account-area").hidden = false;
  element("#account-email").textContent = session.user.email;
  await initializeEditor();
  if (!pageSelect.options.length) {
    sections.forEach(([id, label]) => pageSelect.add(new Option(label, id)));
    pageSelect.addEventListener("change", () => {
      const section = sections.find(([id]) => id === pageSelect.value);
      if (section) void loadSection(section);
    });
  }
  const firstSection = sections.find(([id]) => id === pageSelect.value) || sections[0];
  pageSelect.value = firstSection[0];
  await loadSection(firstSection);
}

element("#auth-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireSupabase()) return;
  authSubmit.disabled = true;
  showStatus(authStatus, "Anmeldung wird geprüft …");
  const values = new FormData(event.currentTarget);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(values.get("email")).trim().toLowerCase(),
    password: String(values.get("password")),
  });
  authSubmit.disabled = false;
  if (error) {
    showStatus(authStatus, `Anmeldung fehlgeschlagen: ${error.message}`, true);
    return;
  }
  await checkAdmin(data.session);
});

element("#register-account").addEventListener("click", async () => {
  if (!requireSupabase()) return;
  const email = element("#auth-email").value.trim().toLowerCase();
  const password = element("#auth-password").value;
  if (!email || password.length < 8) {
    showStatus(authStatus, "Bitte zuerst die Admin-E-Mail und ein Passwort mit mindestens acht Zeichen eingeben.", true);
    return;
  }
  const { error } = await supabase.auth.signUp({ email, password });
  showStatus(authStatus, error
    ? `Registrierung fehlgeschlagen: ${error.message}`
    : "Registrierung angefragt. Falls E-Mail-Bestätigung aktiv ist, bitte erst die Bestätigungsnachricht öffnen und danach anmelden.", Boolean(error));
});

element("#sign-out").addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();
  if (error) showStatus(editorStatus, `Abmelden fehlgeschlagen: ${error.message}`, true);
  else await checkAdmin(null);
});

async function saveDraft(publish) {
  if (!currentSession || !activeSection) return;
  const button = publish ? publishButton : saveButton;
  button.disabled = true;
  showStatus(editorStatus, publish ? "Veröffentlichung wird vorbereitet …" : "Entwurf wird gespeichert …");
  const draft = {
    page_id: activeSection[0],
    draft_project: editor.getProjectData(),
    draft_html: editor.getHtml(),
    draft_css: editor.getCss(),
    updated_by: currentSession.user.id,
    updated_at: new Date().toISOString(),
  };
  const { error: saveError } = await supabase.from("site_pages").upsert(draft, { onConflict: "page_id" });
  if (saveError) {
    button.disabled = false;
    showStatus(editorStatus, `Speichern fehlgeschlagen: ${saveError.message}`, true);
    return;
  }
  if (publish) {
    const { error: publishError } = await supabase.from("site_pages").update({
      published_html: draft.draft_html,
      published_css: draft.draft_css,
      published: true,
    }).eq("page_id", activeSection[0]);
    if (publishError) {
      button.disabled = false;
      showStatus(editorStatus, `Entwurf gespeichert, aber Veröffentlichung fehlgeschlagen: ${publishError.message}`, true);
      return;
    }
    showStatus(editorStatus, "Veröffentlicht. Die Änderung ist nach dem Neuladen der Website sichtbar.");
  } else {
    showStatus(editorStatus, "Entwurf gespeichert. Die öffentliche Website bleibt unverändert.");
  }
  button.disabled = false;
}

saveButton.addEventListener("click", () => void saveDraft(false));
publishButton.addEventListener("click", () => void saveDraft(true));

element("#image-upload").addEventListener("change", async (event) => {
  const [file] = event.currentTarget.files;
  if (!file || !supabase || !currentSession) return;
  if (file.size > 8 * 1024 * 1024) {
    showStatus(editorStatus, "Das Bild ist größer als 8 MB. Bitte vorher verkleinern.", true);
    event.currentTarget.value = "";
    return;
  }
  showStatus(editorStatus, "Bild wird sicher in den Website-Medienordner geladen …");
  const filePath = `${currentSession.user.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const { error } = await supabase.storage.from("site-media").upload(filePath, file, { upsert: false, contentType: file.type });
  if (error) {
    showStatus(editorStatus, `Bild-Upload fehlgeschlagen: ${error.message}. SQL-/Storage-Migration prüfen.`, true);
    event.currentTarget.value = "";
    return;
  }
  const { data } = supabase.storage.from("site-media").getPublicUrl(filePath);
  const selected = editor.getSelected();
  if (selected?.is("image")) selected.addAttributes({ src: data.publicUrl });
  else editor.addComponents({ type: "image", src: data.publicUrl, alt: file.name });
  showStatus(editorStatus, "Bild hochgeladen und im Entwurf eingesetzt. Zum Übernehmen Entwurf speichern.");
  event.currentTarget.value = "";
});

if (supabaseConfigured && supabase) {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event !== "SIGNED_IN" && event !== "SIGNED_OUT") return;
    if (!currentSession || currentSession.user.id !== session?.user.id) {
      window.setTimeout(() => void checkAdmin(session), 0);
    }
  });
  void supabase.auth.getSession().then(({ data, error }) => {
    if (error) showStatus(authStatus, `Sitzung konnte nicht geladen werden: ${error.message}`, true);
    else void checkAdmin(data.session);
  });
} else {
  showStatus(authStatus, "Supabase ist noch nicht konfiguriert. Bitte lokale Umgebungsvariablen setzen.", true);
}
