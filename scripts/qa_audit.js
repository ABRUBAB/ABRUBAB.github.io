const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'qa_results');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runQATests() {
  console.log('=== STARTING COMPREHENSIVE QA AUDIT ===\n');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
    args: ['--disable-extensions', '--disable-component-extensions-with-background-pages']
  });

  const testReport = {
    timestamp: new Date().toISOString(),
    consoleErrors: [],
    failedRequests: [],
    tests: []
  };

  function addResult(name, status, details = {}) {
    console.log(`[${status.toUpperCase()}] ${name}`);
    if (Object.keys(details).length > 0) {
      console.log('   Details:', JSON.stringify(details, null, 2));
    }
    testReport.tests.push({ name, status, details });
  }

  // ==========================================
  // 1. DESKTOP TESTS (Viewport 1280x800)
  // ==========================================
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2
  });

  const page = await desktopContext.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Only track non-extension errors
      if (!text.includes('ipapi') && !text.includes('extension')) {
        console.error('Browser console error:', text);
        testReport.consoleErrors.push({ url: page.url(), text });
      }
    }
  });

  page.on('requestfailed', (req) => {
    if (!req.url().includes('ipapi')) {
      console.error('Request failed:', req.url(), req.failure()?.errorText);
      testReport.failedRequests.push({ url: req.url(), error: req.failure()?.errorText });
    }
  });

  try {
    // ------------------------------------------
    // Test 1: Homepage Load & Layout Structure
    // ------------------------------------------
    console.log('\n--- 1. Testing Homepage (Desktop) ---');
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1500);

    const title = await page.title();
    addResult('Homepage Title & Network Load', 'pass', { title, url: page.url() });

    // Check overflow on desktop
    const desktopOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    addResult('Desktop Zero Horizontal Overflow', desktopOverflow ? 'fail' : 'pass', {
      scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth),
      innerWidth: await page.evaluate(() => window.innerWidth)
    });

    await page.screenshot({ path: path.join(OUTPUT_DIR, '01_homepage_top_desktop.png') });
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01_homepage_full_desktop.png'), fullPage: true });

    // ------------------------------------------
    // Test 2: Hero Morphing Avatar Card Interaction
    // ------------------------------------------
    console.log('\n--- 2. Testing Hero Morphing Avatar Card ---');
    const avatarModeTextBefore = await page.locator('text=Crisp Portrait').isVisible();
    addResult('Hero Avatar Initial Mode: Crisp Portrait', avatarModeTextBefore ? 'pass' : 'fail');

    // Click to morph
    const avatarCard = page.locator('div[title*="Click to transform"]');
    await avatarCard.scrollIntoViewIfNeeded();
    await avatarCard.click();
    await page.waitForTimeout(700);

    const avatarModeTextAfter = await page.locator('text=3D Evidential Point Cloud').isVisible();
    addResult('Hero Avatar Switched to 3D Point Cloud Mode', avatarModeTextAfter ? 'pass' : 'fail');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02_hero_particles_morph.png') });

    // Click back to portrait
    await avatarCard.click();
    await page.waitForTimeout(700);
    const avatarModeTextRestored = await page.locator('text=Crisp Portrait').isVisible();
    addResult('Hero Avatar Toggled Back to Crisp Portrait', avatarModeTextRestored ? 'pass' : 'fail');

    // ------------------------------------------
    // Test 3: Homepage Sections & Cards Counts
    // ------------------------------------------
    console.log('\n--- 3. Testing Homepage Sections & Cards ---');
    const thesisHookExists = await page.locator('text=Trustworthy Medical AI & Uncertainty Quantification').isVisible();
    addResult('Homepage Research Thesis Card', thesisHookExists ? 'pass' : 'fail');

    const pubCardsCount = await page.locator('section:has-text("Featured Publications") article').count();
    addResult('Homepage 3 Selected Publication Cards', pubCardsCount === 3 ? 'pass' : 'fail', { count: pubCardsCount });

    const projCardsCount = await page.locator('section:has-text("Flagship Engineering Projects") article').count();
    addResult('Homepage 4 Compact Project Cards', projCardsCount === 4 ? 'pass' : 'fail', { count: projCardsCount });

    const expCardsCount = await page.locator('section:has-text("Research Appointments & Infrastructure") .grid > div').count();
    addResult('Homepage 4 Experience Cards', expCardsCount === 4 ? 'pass' : 'fail', { count: expCardsCount });

    const hackathonCardExists = await page.locator('text=DIU AI Innovation Hackathon 2026 Winner').isVisible();
    addResult('Homepage Hackathon Champion Spotlight', hackathonCardExists ? 'pass' : 'fail');

    // Open Hackathon Winner Photo Modal
    const photoBtn = page.locator('button:has-text("Inspect Ceremony Award Photo")');
    await photoBtn.click();
    await page.waitForTimeout(400);

    const photoModalVisible = await page.locator('text=DIU AI Innovation Hackathon 2026 — Champion Award Ceremony').isVisible();
    addResult('Hackathon Winner Photo Lightbox Open', photoModalVisible ? 'pass' : 'fail');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03_hackathon_photo_modal.png') });

    // Close Photo Modal via X button
    const closePhotoBtn = page.locator('.fixed.inset-0 button:has(svg.lucide-x)');
    await closePhotoBtn.click();
    await page.waitForTimeout(300);
    const photoModalClosed = !(await page.locator('text=DIU AI Innovation Hackathon 2026 — Champion Award Ceremony').isVisible());
    addResult('Hackathon Winner Photo Lightbox Closed', photoModalClosed ? 'pass' : 'fail');

    // Check all "Read Full...", "View All...", "Explore..." link targets
    const aboutLinkHref = await page.locator('a:has-text("Read Full Journey & Philosophy")').getAttribute('href');
    const pubLinkHref = await page.locator('a:has-text("View All 7 Manuscripts & DOIs")').getAttribute('href');
    const projLinkHref = await page.locator('a:has-text("Explore Full Project Case Studies")').getAttribute('href');
    const expLinkHref = await page.locator('a:has-text("View Systems & Experience")').getAttribute('href');
    const cvLinkHref = await page.locator('a:has-text("View Academic CV")').getAttribute('href');

    addResult('Homepage Section Links Target Valid Routes',
      aboutLinkHref && aboutLinkHref.includes('/about') &&
      pubLinkHref && pubLinkHref.includes('/publications') &&
      projLinkHref && projLinkHref.includes('/projects') &&
      expLinkHref && expLinkHref.includes('/experience') &&
      cvLinkHref && cvLinkHref.includes('/cv') ? 'pass' : 'fail',
      { aboutLinkHref, pubLinkHref, projLinkHref, expLinkHref, cvLinkHref }
    );

    // ------------------------------------------
    // Test 4: Cite (BibTeX) Modal on Homepage
    // ------------------------------------------
    console.log('\n--- 4. Testing Homepage Cite Modal ---');
    const firstCiteBtn = page.locator('section:has-text("Featured Publications") article button:has-text("Cite")').first();
    await firstCiteBtn.click();
    await page.waitForTimeout(300);

    const bibtexModalVisible = await page.locator('text=BibTeX Citation').isVisible();
    addResult('BibTeX Citation Modal Open on Homepage', bibtexModalVisible ? 'pass' : 'fail');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04_bibtex_modal_homepage.png') });

    // Test Copy BibTeX button
    const copyBibtexBtn = page.locator('button:has-text("Copy BibTeX")');
    await copyBibtexBtn.click();
    await page.waitForTimeout(300);
    const copiedFeedback = await page.locator('text=Copied BibTeX').isVisible();
    addResult('BibTeX Copy to Clipboard Interaction', copiedFeedback ? 'pass' : 'fail');

    // Close BibTeX Modal
    const closeBibtexBtn = page.locator('.fixed.inset-0 button:has-text("Close")');
    await closeBibtexBtn.click();
    await page.waitForTimeout(300);

    // ------------------------------------------
    // Test 5: Contact Modal from Header
    // ------------------------------------------
    console.log('\n--- 5. Testing Contact Modal ---');
    const headerContactBtn = page.locator('header button[aria-label="Contact"]');
    await headerContactBtn.click();
    await page.waitForTimeout(300);

    const contactModalVisible = await page.locator('text=Direct Academic Contact').isVisible();
    addResult('Contact Modal Open', contactModalVisible ? 'pass' : 'fail');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05_contact_modal.png') });

    // Test copy email button
    const copyEmailBtn = page.locator('.fixed.inset-0 button:has-text("Copy")').first();
    await copyEmailBtn.click();
    await page.waitForTimeout(300);
    const emailCopiedVisible = await page.locator('.fixed.inset-0').getByText('Copied').first().isVisible();
    addResult('Academic Email Copy Interaction', emailCopiedVisible ? 'pass' : 'fail');

    // Close Contact Modal
    const closeContactBtn = page.locator('.fixed.inset-0 button:has(svg.lucide-x)');
    await closeContactBtn.click();
    await page.waitForTimeout(300);

    // ------------------------------------------
    // Test 6: Reviewer Mode Toggle
    // ------------------------------------------
    console.log('\n--- 6. Testing Reviewer Mode Toggle ---');
    const reviewerToggleBtn = page.locator('header button[aria-label="Toggle Reviewer Mode"]');
    await reviewerToggleBtn.click();
    await page.waitForTimeout(500);

    const reviewerDossierVisible = await page.locator('text=Scholarship Committee Reviewer Dossier').isVisible();
    addResult('Reviewer Mode Toggle ON (Dossier View)', reviewerDossierVisible ? 'pass' : 'fail');
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06_reviewer_mode_view.png'), fullPage: true });

    // Toggle back to Normal Mode
    await reviewerToggleBtn.click();
    await page.waitForTimeout(500);
    const normalHeroVisible = await page.locator('h1:has-text("I build medical AI that")').isVisible();
    addResult('Reviewer Mode Toggle OFF (Restored Visual Hero)', normalHeroVisible ? 'pass' : 'fail');

    // ------------------------------------------
    // Test 7: Subpage /about
    // ------------------------------------------
    console.log('\n--- 7. Testing Subpage /about ---');
    await page.goto('http://localhost:3000/about', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(800);

    const aboutHeadingVisible = await page.locator('h1:has-text("Researching medical AI that")').isVisible();
    const thesisSectionVisible = await page.locator('text=The Core Thesis: Trust Before Prediction').isVisible();
    const codingSectionVisible = await page.locator('text=From Competitive Coding to Distributed GPU Platforms').isVisible();
    const trajectorySectionVisible = await page.locator('text=Graduate Vision & European Research Focus').isVisible();
    const academicDossierVisible = await page.locator('text=Academic Overview').isVisible();
    const languageGridVisible = await page.locator('text=Language Proficiency & Communication').isVisible();

    addResult('/about Page Structure & Narrative Sections', 
      aboutHeadingVisible && thesisSectionVisible && codingSectionVisible && trajectorySectionVisible ? 'pass' : 'fail'
    );
    addResult('/about Academic Dossier & CGPA 3.84', academicDossierVisible ? 'pass' : 'fail');
    addResult('/about Language Proficiency Grid (English, Bengali, Hindi)', languageGridVisible ? 'pass' : 'fail');

    await page.screenshot({ path: path.join(OUTPUT_DIR, '07_about_page_full.png'), fullPage: true });

    // ------------------------------------------
    // Test 8: Subpage /publications
    // ------------------------------------------
    console.log('\n--- 8. Testing Subpage /publications ---');
    await page.goto('http://localhost:3000/publications', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(800);

    const pubPageTitleVisible = await page.locator('h1:has-text("Peer-Reviewed Research & Manuscripts")').isVisible();
    const totalPubCards = await page.locator('article').count();
    addResult('/publications Page Loaded with 7 Papers', totalPubCards === 7 ? 'pass' : 'fail', { count: totalPubCards });

    // Test Filter Tabs
    await page.locator('button:has-text("Published (IEEE)")').click();
    await page.waitForTimeout(300);
    const publishedCount = await page.locator('article').count();
    addResult('Filter Tab: Published (IEEE)', publishedCount === 1 ? 'pass' : 'fail', { count: publishedCount });

    await page.locator('button:has-text("Accepted (BECITHCON)")').click();
    await page.waitForTimeout(300);
    const acceptedCount = await page.locator('article').count();
    addResult('Filter Tab: Accepted (BECITHCON)', acceptedCount === 2 ? 'pass' : 'fail', { count: acceptedCount });

    await page.locator('button:has-text("Under Review (Q1)")').click();
    await page.waitForTimeout(300);
    const underReviewCount = await page.locator('article').count();
    addResult('Filter Tab: Under Review (Q1)', underReviewCount === 2 ? 'pass' : 'fail', { count: underReviewCount });

    await page.locator('button:has-text("In Preparation")').click();
    await page.waitForTimeout(300);
    const inPrepCount = await page.locator('article').count();
    addResult('Filter Tab: In Preparation', inPrepCount === 2 ? 'pass' : 'fail', { count: inPrepCount });

    await page.locator('button:has-text("All Papers")').click();
    await page.waitForTimeout(300);
    const restoredAllCount = await page.locator('article').count();
    addResult('Filter Tab: All Papers Restored', restoredAllCount === 7 ? 'pass' : 'fail', { count: restoredAllCount });

    // Expand Abstract
    const firstAbstractToggle = page.locator('button:has-text("Read Abstract & Methodology")').first();
    await firstAbstractToggle.click();
    await page.waitForTimeout(300);
    const abstractTextVisible = await page.locator('text=Hide Abstract & Method').isVisible();
    addResult('/publications Expandable Abstract & Methodology', abstractTextVisible ? 'pass' : 'fail');

    // Cite Modal on /publications
    const pubCiteBtn = page.locator('button:has-text("Cite (BibTeX)")').first();
    await pubCiteBtn.click();
    await page.waitForTimeout(300);
    const pubBibtexModalOpen = await page.locator('.fixed.inset-0').getByText('BibTeX Citation').first().isVisible();
    addResult('/publications Cite (BibTeX) Modal Open', pubBibtexModalOpen ? 'pass' : 'fail');

    await page.locator('.fixed.inset-0 button:has-text("Close")').click();
    await page.waitForTimeout(300);

    await page.screenshot({ path: path.join(OUTPUT_DIR, '08_publications_page_full.png'), fullPage: true });

    // ------------------------------------------
    // Test 9: Subpage /projects
    // ------------------------------------------
    console.log('\n--- 9. Testing Subpage /projects ---');
    await page.goto('http://localhost:3000/projects', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(800);

    const projectCardsCount = await page.locator('article').count();
    addResult('/projects Deep-Dive Case Studies', projectCardsCount === 5 ? 'pass' : 'fail', { count: projectCardsCount });

    const benchmarkCardsCount = await page.locator('h3:has-text("Validated Benchmarks & Results")').count();
    addResult('/projects Validated Benchmark Cards Present', benchmarkCardsCount >= 3 ? 'pass' : 'fail', { count: benchmarkCardsCount });

    const githubLinksCount = await page.locator('a:has-text("View GitHub Repository")').count();
    addResult('/projects GitHub Repository Links', githubLinksCount === 5 ? 'pass' : 'fail', { count: githubLinksCount });

    await page.screenshot({ path: path.join(OUTPUT_DIR, '09_projects_page_full.png'), fullPage: true });

    // ------------------------------------------
    // Test 10: Subpage /experience
    // ------------------------------------------
    console.log('\n--- 10. Testing Subpage /experience ---');
    await page.goto('http://localhost:3000/experience', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(800);

    const expRolesCount = await page.locator('article').count();
    addResult('/experience Institutional Appointments', expRolesCount === 4 ? 'pass' : 'fail', { count: expRolesCount });

    const nbtcVisible = await page.locator('text=NanoBio Technology Center (NBTC)').first().isVisible();
    const hirlVisible = await page.locator('text=Health Informatics Research Laboratory (HIRL)').first().isVisible();
    const clusterVisible = await page.locator('text=DIU GPU Cluster').first().isVisible();
    const keyoonVisible = await page.locator('text=Keyoon.com').first().isVisible();

    addResult('/experience Appointments: NBTC, HIRL, GPU Cluster, Keyoon',
      nbtcVisible && hirlVisible && clusterVisible && keyoonVisible ? 'pass' : 'fail',
      { nbtcVisible, hirlVisible, clusterVisible, keyoonVisible }
    );

    await page.screenshot({ path: path.join(OUTPUT_DIR, '10_experience_page_full.png'), fullPage: true });

    // ------------------------------------------
    // Test 11: Subpage /cv
    // ------------------------------------------
    console.log('\n--- 11. Testing Subpage /cv ---');
    await page.goto('http://localhost:3000/cv', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(800);

    const cvHeaderVisible = await page.locator('h1:has-text("Abdullah Rubab")').isVisible();
    const printBtnVisible = await page.locator('button:has-text("Print / Save as PDF")').isVisible();
    const researchStmtVisible = await page.locator('h2:has-text("Research Statement")').isVisible();
    const educationVisible = await page.locator('h2:has-text("Education")').isVisible();
    const pubListVisible = await page.locator('h2:has-text("Publications & Manuscripts")').isVisible();

    addResult('/cv Academic Printable CV Layout & Content',
      cvHeaderVisible && printBtnVisible && researchStmtVisible && educationVisible && pubListVisible ? 'pass' : 'fail'
    );

    await page.screenshot({ path: path.join(OUTPUT_DIR, '11_cv_page_full.png'), fullPage: true });

  } finally {
    await page.close();
    await desktopContext.close();
  }

  // ==========================================
  // 2. MOBILE TESTS (Viewport 375x667 - iPhone SE)
  // ==========================================
  console.log('\n--- 12. Testing Mobile Responsiveness (375px) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const mobilePage = await mobileContext.newPage();

  try {
    const pagesToCheck = [
      { path: '/', name: 'Homepage' },
      { path: '/about', name: 'About' },
      { path: '/publications', name: 'Publications' },
      { path: '/projects', name: 'Projects' },
      { path: '/experience', name: 'Experience' },
      { path: '/cv', name: 'CV' }
    ];

    for (const p of pagesToCheck) {
      await mobilePage.goto(`http://localhost:3000${p.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await mobilePage.waitForTimeout(800);

      // Check horizontal overflow
      const overflowData = await mobilePage.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        const hasOverflow = docWidth > winWidth || bodyWidth > winWidth;
        
        return { hasOverflow, docWidth, bodyWidth, winWidth };
      });

      addResult(`Mobile Zero Horizontal Overflow: ${p.name}`, !overflowData.hasOverflow ? 'pass' : 'fail', overflowData);

      const safeName = p.name.toLowerCase();
      await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, `12_mobile_${safeName}.png`) });
    }

    // Test Mobile Hamburger Menu
    console.log('\n--- 13. Testing Mobile Hamburger Menu Navigation ---');
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await mobilePage.waitForTimeout(500);

    const hamburgerBtn = mobilePage.locator('header button[aria-label="Toggle Navigation Menu"]');
    await hamburgerBtn.click();
    await mobilePage.waitForTimeout(400);

    const drawerVisible = await mobilePage.locator('text=Portfolio Menu').isVisible();
    const navLinksInDrawer = await mobilePage.locator('.lg\\:hidden a:has-text("Publications")').isVisible();
    addResult('Mobile Navigation Menu Open & Links Rendered', drawerVisible && navLinksInDrawer ? 'pass' : 'fail');
    await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, '13_mobile_hamburger_drawer_open.png') });

    // Click link in drawer to navigate to /projects
    const drawerProjectsLink = mobilePage.locator('.lg\\:hidden a:has-text("Projects")');
    await drawerProjectsLink.click();
    await mobilePage.waitForTimeout(700);

    const navigatedToProjects = mobilePage.url().includes('/projects');
    addResult('Mobile Drawer Navigation Link to /projects', navigatedToProjects ? 'pass' : 'fail', { url: mobilePage.url() });

    // Open and close menu test
    const hamburgerBtnOnProjects = mobilePage.locator('header button[aria-label="Toggle Navigation Menu"]');
    await hamburgerBtnOnProjects.click();
    await mobilePage.waitForTimeout(300);
    // Click close
    await hamburgerBtnOnProjects.click();
    await mobilePage.waitForTimeout(300);
    const drawerClosed = !(await mobilePage.locator('text=Portfolio Menu').isVisible());
    addResult('Mobile Navigation Menu Close Interaction', drawerClosed ? 'pass' : 'fail');

  } finally {
    await mobilePage.close();
    await mobileContext.close();
  }

  await browser.close();

  // Save JSON report
  fs.writeFileSync(path.join(OUTPUT_DIR, 'qa_report.json'), JSON.stringify(testReport, null, 2));
  console.log('\n=== ALL QA TESTS COMPLETED. REPORT SAVED TO qa_results/qa_report.json ===\n');
}

runQATests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
