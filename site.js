import { supabase, supabaseConfigured } from "./src/supabase.js";

const navigation = [
  ["home", "Startseite", "index.html"],
  ["zuhause", "Unser Zuhause", "zuhause.html"],
  ["facts", "Auf einen Blick", "auf-einen-blick.html"],
  ["paedagogik", "Pädagogik", "paedagogik.html"],
  ["aufnahme", "Aufnahme", "aufnahme.html"],
  ["ueber-uns", "Über uns", "ueber-uns.html"],
  ["team", "Team", "team.html"],
  ["kontakt", "Kontakt", "kontakt.html", true],
];

const pageMeta = {
  home: ["Alte Schule Bojum – Ein Zuhause für Kinder und Jugendliche", "Haus für heilpädagogische Erziehungshilfe in Esgrus-Bojum. Informationen zu Zielgruppe, Pädagogik, Aufnahme und Kontakt."],
  zuhause: ["Unser Zuhause – Alte Schule Bojum", "Das Kinderhaus und seine ländliche Umgebung in Esgrus-Bojum."],
  facts: ["Auf einen Blick – Alte Schule Bojum", "Die wichtigsten Angaben zum Kinderhaus, zur Lage, zur pädagogischen Arbeit und zu den schulischen und Freizeitangeboten."],
  paedagogik: ["Pädagogik – Alte Schule Bojum", "Pädagogische Ziele und Förderung in der Alten Schule Bojum."],
  aufnahme: ["Zielgruppe und Aufnahme – Alte Schule Bojum", "Informationen zur Zielgruppe, zu Voraussetzungen und zum Aufnahmeverfahren der Alten Schule Bojum."],
  "ueber-uns": ["Über uns – Alte Schule Bojum", "Annika und Johannes Brummack leiten die Alte Schule Bojum seit Januar 2002."],
  philosophie: ["Philosophie – Alte Schule Bojum", "Grundsätze der heilpädagogischen Arbeit in der Alten Schule Bojum."],
  team: ["Team – Alte Schule Bojum", "Aufgaben und Zusammenarbeit im Team der Alten Schule Bojum."],
  kontakt: ["Kontakt – Alte Schule Bojum", "Telefon, Telefax und E-Mail der Alten Schule Bojum."],
  impressum: ["Impressum – Alte Schule Bojum", "Impressum und Anbieterkennzeichnung der Alten Schule Bojum."],
  datenschutz: ["Datenschutz – Alte Schule Bojum", "Datenschutzhinweise für die Website der Alten Schule Bojum."],
};

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const pageLinks = [
  ["Auf einen Blick", "auf-einen-blick.html"],
  ["Philosophie", "philosophie.html"],
  ["Impressum", "impressum.html"],
  ["Datenschutz", "datenschutz.html"],
];

const photoAssets = {
  abacus: { src: asset("images/optimized/allgemein/uebersicht-abakus.jpg"), alt: "Nahaufnahme eines Abakus." },
  childrenOnMeadow: { src: asset("images/optimized/aussenbereich/kinder-auf-der-wiese.jpg"), alt: "Kinder liegen gemeinsam auf einer Wiese." },
  house: { src: asset("images/optimized/haus/bojum-haus-im-freien.jpg"), alt: "Außenansicht des Hauses der Alten Schule Bojum." },
  hands: { src: asset("images/optimized/allgemein/haende-philosophie.jpg"), alt: "Mehrere Hände sind in die Höhe gestreckt." },
  childrenTogether: { src: asset("images/optimized/aussenbereich/kinder-zusammenhalt.jpg"), alt: "Kinder gehen gemeinsam draußen entlang." },
  leaders: { src: asset("images/optimized/team/annika-und-johannes-brummack.jpg"), alt: "Annika und Johannes Brummack." },
  childInTree: { src: asset("images/optimized/aussenbereich/kind-auf-dem-baum.jpg"), alt: "Ein Kind klettert auf einen Baum." },
  childLearning: { src: asset("images/optimized/allgemein/kind-beim-lernen.jpg"), alt: "Ein Kind arbeitet an einer Aufgabe am Tisch." },
  childWithBall: { src: asset("images/optimized/aussenbereich/kind-mit-ball.jpg"), alt: "Ein Kind hält einen Ball im Freien." },
  childrenUnderTree: { src: asset("images/optimized/aussenbereich/kinder-unter-dem-baum.jpg"), alt: "Kinder sitzen gemeinsam unter einem Baum." },
  childrenInWagon: { src: asset("images/optimized/aussenbereich/kinder-im-wagen.jpg"), alt: "Kinder und Erwachsene sitzen gemeinsam in einem Wagen." },
  childrenAtMill: { src: asset("images/optimized/aussenbereich/kinder-an-der-muehle.jpg"), alt: "Kinder und Erwachsene gehen auf einem Weg nahe einer Windmühle." },
  childrenOnField: { src: asset("images/optimized/aussenbereich/kinder-auf-der-wiese-zielgruppe.jpg"), alt: "Drei Kinder sitzen auf einer blühenden Wiese." },
  swedenBoat: { src: asset("images/optimized/aussenbereich/ausflug-in-schweden-boot.jpg"), alt: "Kinder und Erwachsene steigen an einem Ufer in ein Boot." },
  swedenGroup: { src: asset("images/optimized/aussenbereich/kinder-in-schweden.jpg"), alt: "Eine Gruppe ist gemeinsam im Freien unterwegs." },
  silhouette: { src: asset("images/optimized/allgemein/zielgruppe-silhouette.jpg"), alt: "Silhouetten einer Gruppe vor dem Abendhimmel." },
};

const photoGalleries = {
  home: [photoAssets.childrenTogether, photoAssets.childrenInWagon, photoAssets.childrenUnderTree, photoAssets.childWithBall],
  zuhause: [photoAssets.childInTree, photoAssets.childrenAtMill, photoAssets.swedenBoat, photoAssets.swedenGroup, photoAssets.childrenOnMeadow],
  aufnahme: [photoAssets.childrenOnField],
};

function renderPhotoGallery(photos, className = "") {
  return `<div class="photo-gallery ${className}">${photos.map(({ src, alt }) => `
    <figure class="image-frame photo-gallery__item" data-reveal>
      <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
    </figure>`).join("")}
  </div>`;
}

const homePage = `
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-copy" data-reveal>
        <p class="eyebrow">Esgrus-Bojum · Schleswig-Holstein</p>
        <h1>Ein Zuhause für Kinder <em>&amp; Jugendliche</em></h1>
        <p class="lede">Im gemeinsamen Leben von Kindern und Erwachsenen werden Kinder, Jugendliche und junge Volljährige dabei unterstützt, zu einer stabilen Persönlichkeit heranzuwachsen.</p>
        <div class="hero-actions">
          <a class="button" href="zuhause.html">Das Haus kennenlernen <span aria-hidden="true">↗</span></a>
          <a class="link-arrow" href="kontakt.html">Kontakt aufnehmen <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <figure class="hero-art" data-reveal>
        <img src="${asset("images/optimized/haus/hauszeichnung-bojum.jpg")}" alt="Zeichnung des Gebäudes der Alten Schule Bojum" fetchpriority="high">
      </figure>
    </div>
    <div class="scroll-cue" aria-hidden="true">Weiterlesen</div>
  </section>

  <section class="story-section" aria-label="Scroll-Animation des Hauszeichens">
    <div class="story-sticky">
      <canvas class="scene-canvas" id="house-scene" role="img" aria-label="Das originale Hauszeichen aus dem Logo wird beim Scrollen sichtbar">
        Das originale Hauszeichen aus dem Logo.
      </canvas>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div data-reveal>
        <p class="eyebrow">Alte Schule Bojum</p>
        <h2>Haus für heilpädagogische Erziehungshilfe.</h2>
      </div>
      <div class="text-column" data-reveal>
        <p>Die Orientierung an familiären Strukturen verbindet sich mit einem professionellen pädagogischen Umgang. So sollen geeignete Lebens- und Entwicklungsbedingungen entstehen.</p>
        <p>Das Kinderhaus besteht seit 1976. Annika und Johannes Brummack leiten es seit Januar 2002 in eigener Verantwortung.</p>
        <a class="link-arrow" href="philosophie.html">Unsere Haltung kennenlernen <span aria-hidden="true">→</span></a>
        <div class="number-line">
          <div class="number-item"><span class="number-value">1976</span><span class="number-label">Gründungsjahr</span></div>
          <div class="number-item"><span class="number-value">2002</span><span class="number-label">Leitung durch Annika und Johannes Brummack seit Januar</span></div>
          <div class="number-item"><span class="number-value">ab 6</span><span class="number-label">Aufnahmealter, Ausnahmen möglich</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--sage">
    <div class="wrap">
      <div class="section-head" data-reveal>
        <p class="eyebrow">Pädagogische Ziele</p>
        <h2>Selbstbewusstsein, soziale Kompetenz und Bildung fördern.</h2>
        <p class="lede">Die Ziele richten sich nach den individuellen Möglichkeiten der Kinder und Jugendlichen.</p>
      </div>
      <div class="feature-grid">
        <article class="feature" data-reveal><span class="feature-no">01</span><h3>Selbstbewusstsein</h3><p>Die Kinder und Jugendlichen sollen Selbstbewusstsein, Eigenverantwortung und Selbstständigkeit entwickeln.</p></article>
        <article class="feature" data-reveal><span class="feature-no">02</span><h3>Soziale Kompetenz</h3><p>Die soziale Kompetenz wird individuell gefördert.</p></article>
        <article class="feature" data-reveal><span class="feature-no">03</span><h3>Schulische Möglichkeiten</h3><p>Die schulischen Möglichkeiten jedes einzelnen Kindes und Jugendlichen sollen gestärkt werden.</p></article>
      </div>
      <a class="link-arrow" href="paedagogik.html">Mehr über die pädagogischen Ziele <span aria-hidden="true">→</span></a>
    </div>
  </section>

  <section class="section">
    <div class="wrap split split--reverse">
      <div data-reveal>
        <p class="eyebrow">Standort</p>
        <h2>Esgrus-Bojum in Schleswig-Holstein.</h2>
        <p class="lede">Die Alte Schule Bojum liegt in ländlicher Umgebung. Sterup, Gelting, Kappeln und Süderbrarup werden als nahegelegene Orte genannt.</p>
        <p>Im Internetauftritt der Einrichtung werden schulische, musische und sportliche Angebote in der Umgebung beschrieben. Welche davon aktuell genutzt werden, lässt sich direkt bei der Einrichtung erfragen.</p>
        <a class="link-arrow" href="auf-einen-blick.html">Fakten und Umfeld ansehen <span aria-hidden="true">→</span></a>
      </div>
      <div class="feature" data-reveal><span class="feature-no">Alte Schule Bojum</span><h3>Ein strukturiertes Lebensumfeld.</h3><p>Die Einrichtung unterstützt Kinder und Jugendliche dabei, zunehmend eigenverantwortlich zu handeln.</p></div>
    </div>
  </section>

  <section class="section section--sage">
    <div class="wrap">
      <div class="section-head" data-reveal><p class="eyebrow">Bildergalerie</p><h2>Alte Schule Bojum in Bildern.</h2></div>
      ${renderPhotoGallery(photoGalleries.home, "photo-gallery--home")}
    </div>
  </section>

  <section class="section section--dark">
    <div class="wrap split">
      <div data-reveal><p class="eyebrow">Philosophie</p><h2>Beziehungen eingehen und Bindungen entwickeln.</h2></div>
      <div class="text-column" data-reveal><p>Ein verlässlicher und strukturierter Lebensrahmen soll ein Zuhause für kürzere oder längere Zeit sein.</p><a class="button button--outline" href="philosophie.html">Unsere Philosophie <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div data-reveal>
        <p class="eyebrow">Annika und Johannes Brummack</p>
        <h2>Ein gemeinsamer Weg in Bojum.</h2>
      </div>
      <div class="text-column" data-reveal>
        <p>Annika und Johannes Brummack sind in der pädagogischen Arbeit und im Leben der Einrichtung verwurzelt. Sie haben die Leitung 2002 übernommen und führen das Haus gemeinsam mit Mitarbeitenden.</p>
        <p>Ihre beruflichen Wege verbinden Lehramt und heilpädagogische Ausbildungen. Annika Brummack hat sich außerdem in Gewaltprävention und Traumapädagogik weitergebildet.</p>
        <a class="link-arrow" href="ueber-uns.html">Mehr über die Leitung <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>

  <section class="section section--sage">
    <div class="wrap split">
      <div class="text-column" data-reveal>
        <p class="eyebrow">Kontakt</p>
        <h2>Fragen zur Einrichtung oder Aufnahme?</h2>
        <p>Annika und Johannes Brummack sind telefonisch und per E-Mail erreichbar.</p>
        <a class="button" href="kontakt.html">Kontakt aufnehmen <span aria-hidden="true">↗</span></a>
      </div>
      <div class="feature" data-reveal>
        <span class="feature-no">Kontakt</span>
        <h3>Alte Schule Bojum</h3>
        <p>Haus für heilpädagogische Erziehungshilfe<br>Esgrus-Bojum · Schleswig-Holstein</p>
      </div>
    </div>
  </section>`;

const pages = {
  home: {
    title: pageMeta.home[0],
    content: homePage,
  },
  zuhause: {
    eyebrow: "Lage und Alltag",
    title: "Unser Zuhause in Bojum.",
    intro: "Die Alte Schule Bojum liegt in Esgrus-Bojum im Norden Schleswig-Holsteins. Die ruhige Lage gehört zum Alltag des Hauses; Orte und Angebote der Umgebung bleiben erreichbar.",
    image: photoAssets.house.src,
    imageAlt: photoAssets.house.alt,
    body: `
      <section class="section">
        <div class="wrap split">
          <div data-reveal><p class="eyebrow">Die Lage</p><h2>Auf dem Land, mit Orten in der Nähe.</h2></div>
          <div class="text-column" data-reveal>
            <p>Das Haus liegt in ländlicher Umgebung nahe Wippendorf. Sterup und Gelting liegen etwa sieben Kilometer entfernt, Kappeln und Süderbrarup rund zwölf Kilometer.</p>
            <p>Schleswig, Eckernförde und Flensburg sind etwa 30 Kilometer entfernt.</p>
            <a class="link-arrow" href="auf-einen-blick.html">Alle Angaben zum Umfeld <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
      <section class="section section--sage">
        <div class="wrap">
          <div class="section-head" data-reveal><p class="eyebrow">Möglichkeiten in der Umgebung</p><h2>Schule, Musik, Bewegung und Natur.</h2><p class="lede">Die Angebote richten sich nach den Interessen und Möglichkeiten der Kinder und Jugendlichen. Konkrete aktuelle Möglichkeiten werden gemeinsam abgestimmt.</p></div>
          <div class="feature-grid">
            <article class="feature" data-reveal><span class="feature-no">Schule</span><h3>Schulische Förderung</h3><p>Genannt werden Schulen in Sterup, Satrup, Sörup und Süderbrarup sowie berufliche Angebote in der Umgebung.</p></article>
            <article class="feature" data-reveal><span class="feature-no">Freizeit</span><h3>Interessen ausprobieren</h3><p>Genannt werden Musikunterricht, Sport im Verein, Schwimmen, Reiten und weitere Bewegungsangebote.</p></article>
            <article class="feature" data-reveal><span class="feature-no">Draußen</span><h3>Platz für Naturerlebnisse</h3><p>Spielen drinnen und draußen, Zeit mit Freundinnen und Freunden und Erlebnisse in der Natur gehören zum beschriebenen Alltag.</p></article>
          </div>
          <p class="small-note" style="margin-top:1.2rem">Schulen und Freizeitangebote können sich ändern. Aktuelle Möglichkeiten bitte direkt bei der Einrichtung erfragen.</p>
        </div>
      </section>
      <section class="section">
        <div class="wrap">
          <div class="section-head" data-reveal><p class="eyebrow">Draußen unterwegs</p><h2>Ausflüge und gemeinsame Zeit.</h2></div>
          ${renderPhotoGallery(photoGalleries.zuhause, "photo-gallery--trips")}
        </div>
      </section>
      <section class="section"><div class="wrap split"><div data-reveal><p class="eyebrow">Die Einrichtung</p><h2>Ein Haus für gemeinsames Leben.</h2></div><div class="text-column" data-reveal><p>Das Kinderhaus orientiert sich an familiären Strukturen und verbindet diese mit professioneller pädagogischer Begleitung. Es soll ein verlässlicher und strukturierter Lebensrahmen sein – für kürzere oder längere Zeit.</p><a class="link-arrow" href="philosophie.html">Unsere Philosophie <span aria-hidden="true">→</span></a></div></div></section>`,
  },
  facts: {
    eyebrow: "Die Einrichtung",
    title: "Alte Schule Bojum auf einen Blick.",
    intro: "Standort, Angebot und Alltag: Die folgenden Angaben wurden auf der Website der Einrichtung veröffentlicht. Einzelne Details können sich geändert haben.",
    image: photoAssets.abacus.src,
    imageAlt: photoAssets.abacus.alt,
    body: `
      <section class="section">
        <div class="wrap">
          <dl class="fact-table">
            <div class="fact-row"><dt>Standort</dt><dd><p>Esgrus-Bojum in Schleswig-Holstein, nahe Wippendorf.</p></dd></div>
            <div class="fact-row"><dt>Entfernungen</dt><dd><p>Sterup und Gelting: etwa 7 km. Kappeln und Süderbrarup: etwa 12 km. Schleswig, Eckernförde und Flensburg: etwa 30 km.</p></dd></div>
            <div class="fact-row"><dt>Rechtsgrundlage</dt><dd><p>§§ 27, 34, 35a und 41 SGB VIII.</p></dd></div>
            <div class="fact-row"><dt>Angebotsform</dt><dd><p>Heilpädagogisches Kinderhaus mit einem engen und konstanten Bezugssystem, individueller Pädagogik, Förderung und Forderung, Wertschätzung von Bildung sowie der Übung selbstständigen Denkens und Handelns. Nachgehende Betreuung wird ebenfalls genannt.</p></dd></div>
            <div class="fact-row"><dt>Einrichtung besteht seit</dt><dd><p>1976</p></dd></div>
            <div class="fact-row"><dt>Träger / Leitung</dt><dd><p>Annika und Johannes Brummack. Sie leiten die Einrichtung seit Januar 2002 in eigener Verantwortung.</p></dd></div>
            <div class="fact-row"><dt>Aufnahmealter</dt><dd><p>Mädchen und Jungen ab sechs Jahren; Ausnahmen sind möglich. Eine Aufnahme wird im Einzelfall besprochen.</p></dd></div>
            <div class="fact-row"><dt>Mitarbeitende</dt><dd><p>Die veröffentlichte Übersicht nennt als Rollen: Heilpädagoge und Realschullehrer als Träger, Heilpädagogin, Grund- und Hauptschullehrerin und Traumapädagogin als Trägerin, sechs Erzieher:innen, bei Bedarf Honorarkräfte, Hauswirtschafterin, Bundesfreiwilligendienstleistende, anderthalb Raumpflegerinnen und einen Haus- und Hofhandwerker.</p></dd></div>
            <div class="fact-row"><dt>Schulische Förderung</dt><dd><p>Das Trägerehepaar mit zweitem Staatsexamen und heilpädagogischer Ausbildung unterstützt gemeinsam mit den Mitarbeitenden die schulische Förderung.</p></dd></div>
            <div class="fact-row"><dt>Schulen und Bildung</dt><dd><p>Genannt werden ein Kindergarten in Esgrusschauby, Grund- und Gemeinschaftsschule in Sterup, Gemeinschaftsschule und Gymnasium in Satrup, eine Förderschule in Sörup (Integration in Sterup), eine Förderschule in Süderbrarup, Berufsschulen in Kappeln und Flensburg, Fachgymnasien in Flensburg sowie die Kappelner Werkstätten und Ausbildungsangebote in der Umgebung.</p></dd></div>
            <div class="fact-row"><dt>Musik und Freizeit</dt><dd><p>Musikunterricht: Klavier, Flöte, Gitarre, Trompete, Klarinette, Saxofon und Schlagzeug. Genannte Sportarten: Fußball, Tischtennis, Schwimmen, Selbstverteidigung, Karate, Judo, Handball, Turnen, Basketball, Segeln, Reiten und Tanzen. Außerdem werden Spielen drinnen und draußen sowie Naturerlebnisse aufgeführt.</p></dd></div>
            <div class="fact-row"><dt>Kontakt zur Herkunftsfamilie</dt><dd><p>In Absprache mit allen Beteiligten und Betroffenen.</p></dd></div>
          </dl>
          <p class="notice" style="margin-top:2rem">Die Angaben zu Team, Schulen, Rechtsgrundlage und Freizeitangeboten bitte vor einer Veröffentlichung mit der Einrichtung abgleichen.</p>
        </div>
      </section>`,
  },
  paedagogik: {
    eyebrow: "Pädagogische Ziele",
    title: "Pädagogische Ziele.",
    intro: "Die Alte Schule Bojum unterstützt Kinder und Jugendliche dabei, eine stabile Persönlichkeit zu entwickeln und ihre individuellen Möglichkeiten zu nutzen.",
    image: photoAssets.childLearning.src,
    imageAlt: photoAssets.childLearning.alt,
    imageClass: "page-hero-art--compact",
    body: `
      <section class="section">
        <div class="wrap">
          <div class="section-head" data-reveal><p class="eyebrow">Beziehungen und Selbstbild</p><h2>Beziehungen und Selbstvertrauen.</h2></div>
          <div class="feature-grid">
            <article class="feature" data-reveal><span class="feature-no">01</span><h3>Vertrauen und Beziehungen</h3><p>Vertrauen aufbauen und hilfreiche Beziehungen aufnehmen und gestalten können.</p></article>
            <article class="feature" data-reveal><span class="feature-no">02</span><h3>Selbstwert und Zutrauen</h3><p>Das Selbstwertgefühl stärken und Selbstbewusstsein und Selbstvertrauen entwickeln.</p></article>
            <article class="feature" data-reveal><span class="feature-no">03</span><h3>Soziales Miteinander</h3><p>Kompetenzen für das Leben in der Gemeinschaft und im gesellschaftlichen Umfeld fördern.</p></article>
          </div>
        </div>
      </section>
      <section class="section section--sage">
        <div class="wrap split">
          <div data-reveal><p class="eyebrow">Alltag und Bildung</p><h2>Im täglichen Leben üben.</h2><p class="lede">Ein klarer Rahmen und passende Unterstützung schaffen Raum, Neues auszuprobieren und Verantwortung zu übernehmen.</p></div>
          <ul class="content-list" data-reveal>
            <li>Eine realistische Selbsteinschätzung und einen angemessenen Realitätssinn entwickeln.</li>
            <li>Werte vermitteln und ein eigenes Wertesystem ausbilden.</li>
            <li>Ein strukturiertes Lebensumfeld schaffen.</li>
            <li>Musische und kreative Fähigkeiten individuell fördern.</li>
            <li>Schulische Lern- und Leistungsmöglichkeiten unterstützen.</li>
            <li>Lebenspraktische Fähigkeiten entwickeln und eigenverantwortliches Handeln begleiten.</li>
          </ul>
        </div>
      </section>
      <section class="section">
        <div class="wrap split split--reverse">
          <div class="text-column" data-reveal><p class="eyebrow">Perspektiven</p><h2>Der eigene Weg entsteht nach und nach.</h2><p>Entwicklungsbedingte Erlebnisse können bearbeitet und individuelle Lebensperspektiven entwickelt werden. Dazu gehört auch, dass junge Menschen zunehmend Verantwortung für eine selbstständige Lebensführung übernehmen.</p><p>Eine Rückkehr in die Familie kann, wenn es passt, ebenfalls eine Perspektive sein.</p></div>
          <ol class="steps" data-reveal>
            <li><div><strong>Eigene Möglichkeiten stärken</strong><p>Selbstständigkeit und Eigenverantwortung wachsen in passenden Schritten.</p></div></li>
            <li><div><strong>Gemeinsam Ziele entwickeln</strong><p>Die pädagogischen Ziele orientieren sich an der individuellen Entwicklung.</p></div></li>
            <li><div><strong>Perspektiven offenhalten</strong><p>Lebenswege werden im Austausch mit den Beteiligten betrachtet.</p></div></li>
          </ol>
        </div>
      </section>`,
  },
  aufnahme: {
    eyebrow: "Zielgruppe und Aufnahme",
    title: "Zielgruppe und Aufnahme.",
    intro: "Ob eine Aufnahme in Frage kommt, wird gemeinsam geprüft. Dazu gehören die Situation des Kindes oder Jugendlichen, die bestehende Gruppe und die Zustimmung der Beteiligten.",
    image: photoAssets.silhouette.src,
    imageAlt: photoAssets.silhouette.alt,
    body: `
      <section class="section">
        <div class="wrap split">
          <div data-reveal><p class="eyebrow">Wer kann aufgenommen werden?</p><h2>Ab sechs Jahren – Ausnahmen sind möglich.</h2></div>
          <div class="text-column" data-reveal>
            <p>Aufgenommen werden Mädchen und Jungen ab sechs Jahren. Als mögliche Gründe für eine heilpädagogische Hilfe werden milieu- und entwicklungsbedingte Auffälligkeiten, emotionale Störungen oder seelische Beeinträchtigungen, Entwicklungsverzögerungen, schulische Schwierigkeiten und Erfahrungen von Missbrauch aufgeführt.</p>
            <p>Diese Angaben beschreiben keine Diagnose und ersetzen keine individuelle Prüfung. Ob das Angebot passt, wird im Gespräch mit den Beteiligten geklärt.</p>
            ${renderPhotoGallery(photoGalleries.aufnahme, "photo-gallery--single")}
          </div>
        </div>
      </section>
      <section class="section section--sage">
        <div class="wrap split split--reverse">
          <div class="text-column" data-reveal><p class="eyebrow">Passung und Voraussetzungen</p><h2>Die Situation jedes Kindes zählt.</h2><p>Für eine Aufnahme wird gemeinsam geprüft, ob ein Zusammenleben in der bestehenden Gruppe möglich ist und ob alle Beteiligten zustimmen. Besonders Jugendliche sollen mit dem Leben im Haus einverstanden sein.</p>
            <div class="notice"><p>Die Bestandsseite nennt als Grenzen des Angebots eine manifeste Drogenproblematik sowie geistige und körperliche Behinderungen höheren Grades. Diese Kriterien sind sensibel und müssen vor einer Veröffentlichung mit der Leitung fachlich und sprachlich geprüft werden.</p></div>
          </div>
          <div data-reveal><p class="eyebrow">Der Ablauf</p><ol class="steps">
            <li><div><strong>Kontakt aufnehmen</strong><p>Meist melden sich Jugendämter, manchmal auch Eltern oder andere beteiligte Stellen telefonisch.</p></div></li>
            <li><div><strong>Unterlagen austauschen</strong><p>Berichte, Zeugnisse und gegebenenfalls Gutachten helfen, die Situation besser kennenzulernen.</p></div></li>
            <li><div><strong>Das Haus besuchen</strong><p>Die Betroffenen können die Alte Schule Bojum kennenlernen und sich selbst ein Bild machen.</p></div></li>
            <li><div><strong>Gemeinsam entscheiden</strong><p>Die mögliche Aufnahme und Entwicklungsziele werden mit allen Beteiligten besprochen.</p></div></li>
          </ol></div>
        </div>
      </section>
      <section class="section"><div class="wrap split"><div data-reveal><p class="eyebrow">Für Jugendämter und Familien</p><h2>Fragen Sie gern nach einem Kennenlernen.</h2></div><div class="text-column" data-reveal><p>Ein Anruf ist ein guter Anfang. Welche Unterlagen gebraucht werden und wie ein Besuch abläuft, kann direkt mit der Einrichtung geklärt werden.</p><a class="button" href="kontakt.html">Kontakt aufnehmen <span aria-hidden="true">↗</span></a></div></div></section>`,
  },
  "ueber-uns": {
    eyebrow: "Über uns",
    title: "Annika und Johannes Brummack.",
    intro: "Die beiden leiten die Alte Schule Bojum seit Januar 2002 in eigener Verantwortung. Ihre beruflichen Wege führten über Lehramt und heilpädagogische Ausbildungen in die Arbeit im Kinderhaus.",
    image: photoAssets.leaders.src,
    imageAlt: photoAssets.leaders.alt,
    imageClass: "page-hero-art--compact",
    body: `
      <section class="section">
        <div class="wrap">
          <article class="profile" data-reveal>
            <h2>Annika Brummack</h2>
            <div>
              <p>Schon während der Schulzeit engagierte sich Annika Brummack im Sportverein und auf Ferienfreizeiten. Sie studierte Technik, Naturwissenschaften und Deutsch für das Lehramt an Grund- und Hauptschulen. Während ihres Referendariats in Süderbrarup zog sie in die Alte Schule ein und entschied sich, dort zu leben und zu arbeiten.</p>
              <p>An das zweite Staatsexamen schloss sie eine Ausbildung zur staatlich anerkannten Heilpädagogin an. Später absolvierte sie eine Weiterbildung zur Fachkraft für Gewaltprävention und 2021 eine zertifizierte Weiterbildung zur Traumapädagogin und Traumafachberaterin.</p>
            </div>
          </article>
          <article class="profile" data-reveal>
            <h2>Johannes Brummack</h2>
            <div>
              <p>Johannes Brummack wuchs in einer Familie auf, die in einem heilpädagogischen Kinderheim tätig war. Mit sechs Jahren zog er mit seinen Eltern und seiner Schwester nach Bojum. Er studierte für das Lehramt an Realschulen mit den Fächern Mathematik und Technik und absolvierte anschließend eine heilpädagogische Ausbildung.</p>
              <p>Die Verbindung technischer und pädagogischer Interessen prägt seinen beruflichen Weg. Gemeinsam mit Annika Brummack übernahm er schrittweise die Verantwortung für das Haus.</p>
            </div>
          </article>
        </div>
      </section>
      <section class="section section--sage"><div class="wrap split"><div data-reveal><p class="eyebrow">Seit 2002</p><h2>Verantwortung gemeinsam übernommen.</h2></div><div class="text-column" data-reveal><p>Die Übergabe durch die Eltern von Johannes Brummack wurde über mehrere Jahre vorbereitet. Seit Januar 2002 leiten Annika und Johannes Brummack die Einrichtung allein. Die Alte Schule Bojum selbst besteht seit 1976.</p><a class="link-arrow" href="team.html">Das Team kennenlernen <span aria-hidden="true">→</span></a></div></div></section>`,
  },
  philosophie: {
    eyebrow: "Unsere Philosophie",
    title: "Beziehungen sind die Grundlage.",
    intro: "Kinder und Jugendliche sollen im gemeinsamen Leben mit Erwachsenen zu einer stabilen Persönlichkeit heranwachsen können – entsprechend ihren eigenen Möglichkeiten und in ihrem eigenen Tempo.",
    image: photoAssets.hands.src,
    imageAlt: photoAssets.hands.alt,
    imageClass: "page-hero-art--compact",
    body: `
      <section class="section">
        <div class="wrap split">
          <div data-reveal><p class="eyebrow">Verlässlichkeit</p><h2>Ein klarer Rahmen. Und Menschen, die bleiben.</h2></div>
          <div class="text-column" data-reveal>
            <p>Die Orientierung an familiären Strukturen verbindet sich mit professionellem pädagogischem Handeln. Ein strukturierter Alltag und verlässliche Beziehungen geben Halt und machen Entwicklung möglich.</p>
            <p>Beziehungen und Bindungen sollen wachsen können. Frühere wichtige Beziehungen werden respektiert und, soweit es möglich ist, in den Entwicklungsprozess einbezogen.</p>
          </div>
        </div>
      </section>
      <section class="section section--dark"><div class="wrap quote-panel" data-reveal><p class="eyebrow">Ein Zuhause auf Zeit</p><p class="lede">Ein verlässlicher und strukturierter Lebensrahmen. Ein Zuhause für kürzere oder längere Zeit.</p></div></section>
      <section class="section"><div class="wrap split split--reverse"><div class="text-column" data-reveal><p class="eyebrow">Entwicklung und Teilhabe</p><h2>Eigene Schritte gehen können.</h2><p>Die Kinder und Jugendlichen sollen darin unterstützt werden, Erfahrungen und Schwierigkeiten zu bewältigen, Selbstbewusstsein zu entwickeln und zunehmend eigenverantwortlich zu handeln.</p><p>Zum gemeinsamen Leben gehören auch soziale Integration und die Möglichkeit, eigene Interessen und Perspektiven zu entwickeln.</p><a class="link-arrow" href="paedagogik.html">Pädagogische Ziele ansehen <span aria-hidden="true">→</span></a></div><ul class="content-list" data-reveal><li>Familiäre Strukturen und professioneller Umgang</li><li>Verlässliche Beziehungen und Bindungen</li><li>Respekt vor bisherigen Beziehungen</li><li>Individuelle Entwicklung und Selbstständigkeit</li><li>Ein strukturierter Lebensrahmen</li></ul></div></section>`,
  },
  team: {
    eyebrow: "Team",
    title: "Das Team der Alten Schule Bojum.",
    intro: "Zum Team gehören die Träger, pädagogische Fachkräfte und Mitarbeitende im Haus und auf dem Hof.",
    body: `
      <section class="section">
        <div class="wrap split">
          <div data-reveal><p class="eyebrow">Zusammenarbeit</p><h2>Aufgaben im Haus und auf dem Hof.</h2></div>
          <div class="text-column" data-reveal>
            <p>Die veröffentlichte Übersicht nennt heilpädagogische und lehrende Qualifikationen, Erzieher:innen, Honorarkräfte bei Bedarf, Hauswirtschaft, Bundesfreiwilligendienst und Reinigung.</p>
            <p>Sie führt sechs Erzieher:innen auf. Die aktuelle Besetzung erfahren Sie direkt bei der Einrichtung.</p>
          </div>
        </div>
      </section>
      <section class="section section--sage"><div class="wrap split split--reverse"><div class="text-column" data-reveal><p class="eyebrow">Zusammenarbeit</p><h2>Austausch und Absprachen.</h2><p>Die pädagogischen Leitgedanken werden gemeinsam mit den Mitarbeitenden getragen und weiterentwickelt.</p><a class="button" href="kontakt.html">Kontakt aufnehmen <span aria-hidden="true">↗</span></a></div><div class="feature"><span class="feature-no">Team</span><h3>Gemeinsame pädagogische Arbeit</h3><p>Die Mitarbeitenden arbeiten in verschiedenen Aufgabenbereichen zusammen.</p></div></div></section>`,
  },
  kontakt: {
    eyebrow: "Kontakt",
    title: "Kontakt zur Alten Schule Bojum.",
    intro: "Für Fragen zur Einrichtung und zur Aufnahme erreichen Sie Annika und Johannes Brummack telefonisch oder per E-Mail.",
    body: `
      <section class="section">
        <div class="wrap contact-grid">
          <div>
            <p class="eyebrow">Alte Schule Bojum</p>
            <ul class="contact-details">
              <li><span>Adresse</span>Esgrus-Bojum<br>24402 Esgrus-Bojum</li>
              <li><span>Telefon</span><a href="tel:+494637677">(04637) 6 77</a></li>
              <li><span>Telefax</span>(04637) 17 64</li>
              <li><span>E-Mail</span><a href="mailto:info@alte-schule-bojum.de">info@alte-schule-bojum.de</a></li>
            </ul>
            <a class="map-link" href="https://www.openstreetmap.org/search?query=Esgrus-Bojum%2024402" target="_blank" rel="noopener noreferrer"><span>Esgrus-Bojum auf der Karte suchen</span><b aria-hidden="true">↗</b></a>
            <p class="small-note" style="margin-top:.7rem">Die Karte wird erst nach einem Klick bei OpenStreetMap geöffnet.</p>
          </div>
          <div>
            <p class="eyebrow">Nachricht vorbereiten</p>
            <p class="small-note">Das Formular öffnet Ihr E-Mail-Programm. Die Nachricht wird erst versandt, wenn Sie dort auf „Senden“ klicken.</p>
            <form class="contact-form" id="contact-form">
              <div class="field"><label for="contact-name">Name *</label><input id="contact-name" name="name" autocomplete="name" maxlength="120" required></div>
              <div class="field"><label for="contact-email">E-Mail-Adresse *</label><input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" required></div>
              <div class="field field--wide"><label for="contact-role">Ich schreibe als</label><select id="contact-role" name="role"><option value="">Bitte auswählen</option><option>Familie</option><option>Jugendamt</option><option>Fachkraft</option><option>Sonstiges</option></select></div>
              <div class="field field--wide"><label for="contact-subject">Anliegen</label><input id="contact-subject" name="subject" autocomplete="off" maxlength="120"></div>
              <div class="field field--wide"><label for="contact-message">Nachricht *</label><textarea id="contact-message" name="message" maxlength="1500" required></textarea></div>
              <div class="field field--wide consent-row"><input id="contact-consent" name="consent" type="checkbox" required><label for="contact-consent">Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage per E-Mail an die Alte Schule Bojum übermittelt werden. *</label></div>
              <p class="small-note field--wide">Bitte schicke keine vertraulichen Angaben oder Gesundheitsdaten zu Kindern über eine gewöhnliche E-Mail.</p>
              <button class="button field--wide" type="submit">E-Mail im eigenen Programm öffnen <span aria-hidden="true">↗</span></button>
              <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
            </form>
          </div>
        </div>
      </section>`,
  },
  impressum: {
    eyebrow: "Rechtliches",
    title: "Impressum.",
    intro: "Angaben zur Anbieterin und Kontaktmöglichkeiten.",
    body: `
      <section class="section"><div class="wrap legal-copy">
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>Annika Brummack<br>Alte Schule Bojum<br>Esgrus-Bojum<br>24402 Esgrus-Bojum</p>
        <h2>Kontakt</h2>
        <p>Telefon: <a href="tel:+494637677">(04637) 6 77</a><br>Telefax: (04637) 17 64<br>E-Mail: <a href="mailto:info@alte-schule-bojum.de">info@alte-schule-bojum.de</a></p>
        <h2>Streitbeilegung</h2>
        <p>Die Alte Schule Bojum ist nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        <h2>Haftung für Inhalte und Links</h2>
        <p>Für eigene Inhalte gelten die gesetzlichen Vorschriften. Für Inhalte externer Seiten, auf die verlinkt wird, sind deren jeweilige Betreiber verantwortlich. Bei Hinweisen auf Rechtsverletzungen werden die betreffenden Inhalte oder Links geprüft und gegebenenfalls entfernt.</p>
        <h2>Urheberrecht</h2>
        <p>Die Inhalte und Werke dieser Website unterliegen dem Urheberrecht. Rechte Dritter bleiben vorbehalten. Für Fragen zu Inhalten wenden Sie sich bitte an die oben genannte Kontaktadresse.</p>
        <div class="legal-logo"><img src="${asset("images/original/allgemein/lfm-logo.svg")}" alt="LFM"></div>
      </div></section>`,
  },
  datenschutz: {
    eyebrow: "Rechtliches",
    title: "Datenschutz.",
    intro: "Hier finden Sie Hinweise dazu, welche personenbezogenen Daten beim Besuch der Website und bei einer Kontaktaufnahme verarbeitet werden.",
    body: `
      <section class="section"><div class="wrap legal-copy">
        <h2>Verantwortliche Stelle</h2>
        <p>Alte Schule Bojum, Annika Brummack<br>Esgrus-Bojum<br>24402 Esgrus-Bojum<br>E-Mail: <a href="mailto:info@alte-schule-bojum.de">info@alte-schule-bojum.de</a><br>Telefon: <a href="tel:+494637677">(04637) 6 77</a></p>
        <h2>Besuch dieser Website</h2>
        <p>Diese Website verwendet keine Analyse- oder Werbedienste und bindet keine externen Schriftarten, Videos oder Karten ein. Für die technische Bereitstellung verarbeitet der Webserver notwendige Verbindungsdaten.</p>
        <h2>Kontakt per Telefon oder E-Mail</h2>
        <p>Wenn Sie telefonisch oder per E-Mail Kontakt aufnehmen, werden die Angaben verarbeitet, die Sie zur Bearbeitung Ihrer Nachricht übermitteln. Bitte senden Sie keine vertraulichen Informationen zu Kindern über eine gewöhnliche E-Mail.</p>
        <h2>Kontaktformular</h2>
        <p>Das Formular dieser Website übermittelt Daten nicht an einen Server. Es erstellt auf Ihrem Gerät einen E-Mail-Entwurf, den Sie in Ihrem eigenen E-Mail-Programm prüfen und selbst versenden. Erst dann werden die Nachricht und Ihre Angaben über die von Ihnen genutzten E-Mail-Dienste übertragen. Das setzt voraus, dass auf Ihrem Gerät ein E-Mail-Programm eingerichtet ist.</p>
        <h2>Externe Links</h2>
        <p>Der Link zur Karte führt zu OpenStreetMap und wird erst geöffnet, wenn Sie ihn anklicken. Ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>
        <h2>Ihre Rechte</h2>
        <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Die konkrete zuständige Stelle richtet sich nach dem Sitz der verantwortlichen Stelle.</p>
      </div></section>`,
  },
};

function renderHeader(activePage) {
  const nav = navigation.map(([key, label, href, contact]) => {
    const active = key === activePage ? ' aria-current="page"' : "";
    return `<li><a class="nav-link${contact ? " nav-contact" : ""}" href="${href}"${active}>${label}</a></li>`;
  }).join("");
  return `
    <div class="site-header">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="Alte Schule Bojum – Startseite">
          <img src="${asset("images/original/allgemein/logo-haus.svg")}" alt="" width="44" height="44">
          <span><span class="brand-name">Alte Schule Bojum</span><span class="brand-subtitle">Haus für heilpädagogische Erziehungshilfe</span></span>
        </a>
        <button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false" aria-label="Menü öffnen"><span></span><span></span></button>
        <nav class="nav-panel" id="primary-navigation" aria-label="Hauptnavigation">
          <ul class="nav-list">${nav}</ul>
        </nav>
      </div>
    </div>`;
}

function renderFooter() {
  const mainLinks = navigation.filter(([key]) => key !== "home").map(([, label, href]) => `<a href="${href}">${label}</a>`).join("");
  const legal = pageLinks.slice(2).map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
  return `
    <div class="wrap">
      <div class="footer-main">
        <div>
          <div class="footer-brand">Alte Schule Bojum
            <small>Haus für heilpädagogische Erziehungshilfe<br>Esgrus-Bojum · Schleswig-Holstein</small>
          </div>
          <div class="footer-partners" aria-label="Weitere Logos aus dem bisherigen Internetauftritt">
            <img src="${asset("images/original/allgemein/aksh-logo.svg")}" alt="AKSH">
            <img src="${asset("images/original/allgemein/ttn-logo.svg")}" alt="TTN">
          </div>
        </div>
        <div><p class="footer-title">Seiten</p><nav class="footer-links" aria-label="Fußnavigation">${mainLinks}<a href="philosophie.html">Philosophie</a></nav></div>
        <div><p class="footer-title">Kontakt</p><address>Esgrus-Bojum<br>24402 Esgrus-Bojum<br><a href="tel:+494637677">(04637) 6 77</a><br><a href="mailto:info@alte-schule-bojum.de">info@alte-schule-bojum.de</a></address></div>
      </div>
      <div class="footer-bottom"><span>© Alte Schule Bojum</span><div>${legal}</div></div>
    </div>`;
}

function renderSubpage(page, pageId) {
  const image = page.image ? `
    <figure class="page-hero-art${page.image.includes("hauszeichnung") ? " page-hero-art--sketch" : ""}${page.imageClass ? ` ${page.imageClass}` : ""}${page.image.includes("zielgruppe-silhouette") ? " page-hero-art--silhouette" : ""}" data-reveal>
      <img src="${page.image}" alt="${page.imageAlt}" fetchpriority="high">
    </figure>` : "";
  const cta = ["impressum", "datenschutz", "kontakt"].includes(pageId) ? "" : `
    <section class="cta-band"><div class="wrap cta-inner"><h2>Sie möchten mehr erfahren?</h2><a class="button" href="kontakt.html">Kontakt aufnehmen <span aria-hidden="true">↗</span></a></div></section>`;
  return `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">${page.eyebrow}</p>
        <h1>${page.title}</h1>
        <p class="lede">${page.intro}</p>
        ${image}
      </div>
    </section>
    ${page.body}
    ${cta}`;
}

function setupNavigation() {
  const button = document.querySelector(".menu-toggle");
  const panel = document.querySelector(".nav-panel");
  if (!button || !panel) return;
  if (button.dataset.navigationInitialized === "true") return;
  button.dataset.navigationInitialized = "true";
  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    panel.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };
  button.addEventListener("click", () => setOpen(button.getAttribute("aria-expanded") !== "true"));
  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      button.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) setOpen(false);
  });
}

function setupReveals() {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const subject = String(values.get("subject") || "Kontaktanfrage Alte Schule Bojum").trim();
    const body = [
      `Name: ${values.get("name")}`,
      `E-Mail: ${values.get("email")}`,
      `Ich schreibe als: ${values.get("role") || "Keine Angabe"}`,
      "",
      String(values.get("message") || ""),
    ].join("\n");
    const mailto = `mailto:info@alte-schule-bojum.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Ihr E-Mail-Programm wird geöffnet. Die Nachricht ist erst versandt, wenn Sie dort auf „Senden“ klicken.";
    window.location.href = mailto;
  });
}

function setupHouseScene() {
  const canvas = document.getElementById("house-scene");
  const section = canvas?.closest(".story-section");
  if (!canvas || !section) return;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const logo = new Image();
  let queued = false;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  const clamp = (value) => Math.max(0, Math.min(1, value));
  const ease = (value) => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  function draw() {
    queued = false;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const nextWidth = Math.round(rect.width);
    const nextHeight = Math.round(rect.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    if (nextWidth !== width || nextHeight !== height || canvas.width !== Math.round(nextWidth * pixelRatio)) {
      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }
    const sectionRect = section.getBoundingClientRect();
    const travel = Math.max(1, sectionRect.height - window.innerHeight);
    const progress = reducedMotion ? 1 : clamp(-sectionRect.top / travel);

    context.clearRect(0, 0, width, height);
    context.fillStyle = "#fff8f3";
    context.fillRect(0, 0, width, height);
    if (logo.complete && logo.naturalWidth > 0) {
      const targetWidth = Math.min(width * 0.92, height * 1.65);
      const targetHeight = targetWidth * logo.naturalHeight / logo.naturalWidth;
      const left = (width - targetWidth) / 2;
      const top = (height - targetHeight) / 2;
      const reveal = targetHeight * ease(progress);
      context.save();
      context.beginPath();
      context.rect(left, top + targetHeight - reveal, targetWidth, reveal);
      context.clip();
      context.drawImage(logo, left, top, targetWidth, targetHeight);
      context.restore();
    }

  }

  const scheduleDraw = () => {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(draw);
    }
  };
  logo.addEventListener("load", scheduleDraw, { once: true });
  logo.addEventListener("error", () => {
    canvas.setAttribute("aria-label", "Das Hauszeichen konnte nicht geladen werden.");
  }, { once: true });
  logo.src = asset("images/original/allgemein/logo-haus.svg");
  window.addEventListener("scroll", scheduleDraw, { passive: true });
  window.addEventListener("resize", scheduleDraw);
  scheduleDraw();
}

async function loadPublishedPage(pageId) {
  if (!supabaseConfigured || !supabase || import.meta.env.VITE_CMS_ENABLED !== "true") return;
  const { data, error } = await supabase
    .from("site_pages")
    .select("page_id,published_html,published_css")
    .in("page_id", [pageId, "global:header", "global:footer"])
    .eq("published", true);
  if (error) {
    console.error(`Veröffentlichte Website-Inhalte konnten nicht geladen werden: ${error.message}`);
    return;
  }
  const records = new Map((data || []).map((record) => [record.page_id, record]));
  const page = records.get(pageId);
  const header = records.get("global:header");
  const footer = records.get("global:footer");
  if (header?.published_html) document.getElementById("site-header").innerHTML = header.published_html;
  if (footer?.published_html) document.getElementById("site-footer").innerHTML = footer.published_html;
  if (page?.published_html) document.getElementById("main").innerHTML = page.published_html;
  [page, header, footer].forEach((record, index) => {
    if (!record?.published_css) return;
    const style = document.createElement("style");
    style.id = ["page-custom-styles", "header-custom-styles", "footer-custom-styles"][index];
    style.textContent = record.published_css;
    document.head.append(style);
  });
  setupNavigation();
  setupReveals();
  setupContactForm();
  setupHouseScene();
}

function initialize() {
  const pageId = document.body.dataset.page || "home";
  const page = pages[pageId] || pages.home;
  const [title, description] = pageMeta[pageId] || pageMeta.home;
  document.title = title;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = description;
  document.getElementById("site-header").innerHTML = renderHeader(pageId);
  document.getElementById("main").innerHTML = pageId === "home" ? page.content : renderSubpage(page, pageId);
  document.getElementById("site-footer").innerHTML = `<div class="site-footer">${renderFooter()}</div>`;
  setupNavigation();
  setupReveals();
  setupContactForm();
  setupHouseScene();
  void loadPublishedPage(pageId);
}

initialize();
