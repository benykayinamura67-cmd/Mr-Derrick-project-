const groups = {
  WEBSITE: [
    ['home', 'Home Page'],
    ['about', 'About School'],
    ['programs', 'Programs & Courses'],
    ['staff', 'Staff & Team'],
    ['gallery', 'Gallery'],
    ['news', 'News & Events'],
    ['testimonials', 'Testimonials'],
    ['announcements', 'Announcements']
  ],

  CONTENT: [
    ['prospectus', 'Prospectus'],
    ['admissions', 'Admissions'],
    ['fees', 'Public Fees'],
    ['faq', 'FAQ'],
    ['documents', 'Documents']
  ],

  COMMUNICATION: [
    ['messages', 'Contact Messages'],
    ['inquiries', 'Admission Inquiries'],
    ['newsletter', 'Newsletter']
  ],

  ADMINISTRATION: [
    ['media', 'Media Library'],
    ['appearance', 'Appearance'],
    ['seo', 'SEO & Search'],
    ['analytics', 'Analytics'],
    ['users', 'Admin Users'],
    ['activity', 'Activity Log']
  ]
};


const icons = {
  home: 'home',
  about: 'info',
  programs: 'book-open',
  staff: 'users',
  gallery: 'image',
  news: 'newspaper',
  testimonials: 'star',
  announcements: 'bell-ring',
  prospectus: 'file-text',
  admissions: 'user-check',
  fees: 'dollar-sign',
  faq: 'help-circle',
  documents: 'folder',
  messages: 'mail',
  inquiries: 'user-plus',
  newsletter: 'send',
  media: 'folder-open',
  appearance: 'layout',
  seo: 'globe',
  analytics: 'bar-chart-2',
  users: 'shield',
  activity: 'activity',
  settings: 'settings'
};


const labels = Object.fromEntries(
  Object.values(groups).flat()
);


const data = {
  programs: [
    ['Hospitality & Tourism Program', 'Hospitality & Tourism', 'Published'],
    ['Food & Beverage Operations', 'Hospitality', 'Published'],
    ['Tourism & Travel Services', 'Tourism', 'Draft'],
    ['Professional Hospitality Skills', 'Skills', 'Published']
  ],

  staff: [
    ['School Management', 'Management'],
    ['Hospitality Training Team', 'Hospitality Department'],
    ['Tourism Training Team', 'Tourism Department']
  ],

  news: [
    ['Welcome to NOAH’S ARK', 'News', 'Published'],
    ['Admissions Information', 'Announcement', 'Published'],
    ['Hospitality Training Highlights', 'News', 'Draft']
  ],

  messages: [
    ['Jean M.', 'Program information', 'Unread'],
    ['Aline K.', 'Prospectus request', 'Read'],
    ['Patrick N.', 'Admission question', 'Unread']
  ],

  inquiries: [
    ['Candidate A', 'Hospitality', 'New'],
    ['Candidate B', 'Tourism', 'Contacted'],
    ['Candidate C', 'Hospitality', 'Follow-up']
  ],

  admins: [
    ['Website Administrator', 'Super Admin', 'Active'],
    ['Content Editor', 'Editor', 'Active']
  ]
};


const configs = {
  home: [
    'Home Page',
    'Control public homepage hero texts, banners, and featured sections.',
    'homepage'
  ],

  about: [
    'About School',
    'Manage the public story, mission, vision, and core values.',
    'aboutForm'
  ],

  programs: [
    'Programs & Courses',
    'Manage programs displayed on the public website.',
    'table'
  ],

  staff: [
    'Staff & Team',
    'Manage staff members appearing publicly on the website.',
    'cards'
  ],

  gallery: [
    'Gallery',
    'Manage public school photos, albums, and visual assets.',
    'gallery'
  ],

  news: [
    'News & Events',
    'Create and manage articles, announcements, and events.',
    'tableNews'
  ],

  testimonials: [
    'Testimonials',
    'Manage student and stakeholder testimonials.',
    'testimonials'
  ],

  announcements: [
    'Announcements',
    'Control public alert bars, banners, and school notices.',
    'announcements'
  ],

  prospectus: [
    'Prospectus',
    'Manage the downloadable PDF prospectus for visitors.',
    'prospectus'
  ],

  admissions: [
    'Admissions Content',
    'Manage public admission guidelines and criteria.',
    'aboutForm'
  ],

  fees: [
    'Public Fees',
    'Manage fee schedules published on the official website.',
    'fees'
  ],

  faq: [
    'FAQ',
    'Manage frequently asked questions for prospective students.',
    'faq'
  ],

  documents: [
    'Public Documents',
    'Manage downloadable public institutional files.',
    'documents'
  ],

  messages: [
    'Contact Messages',
    'Inbox for contact requests submitted via the website.',
    'tableMessages'
  ],

  inquiries: [
    'Admission Inquiries',
    'Review candidate applications submitted from the website.',
    'tableInquiries'
  ],

  newsletter: [
    'Newsletter Subscribers',
    'Manage email subscriptions for website notifications.',
    'newsletter'
  ],

  media: [
    'Media Library',
    'Organize images, promotional videos, and files.',
    'gallery'
  ],

  appearance: [
    'Appearance',
    'Manage branding, themes, and global navigation layouts.',
    'appearance'
  ],

  seo: [
    'SEO & Search',
    'Configure search engine index tags, descriptions, and metadata.',
    'seo'
  ],

  analytics: [
    'Website Analytics',
    'Monitor traffic volume, session lengths, and interactions.',
    'analytics'
  ],

  users: [
    'Admin Users',
    'Control administrative permissions and CMS account access.',
    'tableAdmins'
  ],

  activity: [
    'Activity Log',
    'Track real-time system adjustments and user edits.',
    'activity'
  ],

  settings: [
    'Website Settings',
    'Core administrative configuration for Noah’s Ark platform.',
    'settings'
  ]
};


/* =========================
   NAVIGATION
========================= */

function buildNav() {

  let n = `
    <button
      onclick="go('dashboard')"
      class="nav w-full text-left px-3.5 py-3 rounded-xl bg-gold/15 text-gold font-semibold flex items-center gap-3 border border-gold/30 mb-2"
    >
      <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
      Dashboard Overview
    </button>
  `;

  for (const [group, items] of Object.entries(groups)) {

    n += `
      <p class="px-3 pt-5 pb-2 text-[10px] uppercase tracking-[.25em] text-white/30 font-bold">
        ${group}
      </p>
    `;

    items.forEach(([id, label]) => {

      const icon = icons[id] || 'folder';

      n += `
        <button
          onclick="go('${id}')"
          class="nav w-full text-left px-3.5 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors font-medium"
        >
          <i data-lucide="${icon}" class="w-4 h-4 text-white/40"></i>
          ${label}
        </button>
      `;
    });
  }

  document.getElementById('nav').innerHTML = n;

  lucide.createIcons();
}


/* =========================
   PAGE NAVIGATION
========================= */

function go(id) {

  document
    .querySelectorAll('.section')
    .forEach(section => section.classList.remove('active'));

  let section = document.getElementById(id);

  if (!section) {
    renderSection(id);
    section = document.getElementById(id);
  }

  section.classList.add('active');

  document.getElementById('title').textContent =
    labels[id] || 'Dashboard';

  document.getElementById('crumb').textContent =
    labels[id] || 'Dashboard';

  if (innerWidth < 1024) {
    closeSide();
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


/* =========================
   DYNAMIC SECTIONS
========================= */

function renderSection(id) {

  const [title, subtitle, type] = configs[id] || [];

  const html = `
    <section id="${id}" class="section">

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 bg-gradient-to-r from-forest-800/50 to-transparent p-6 sm:p-8 rounded-3xl border border-gold/10">

        <div>

          <span class="text-gold text-xs uppercase tracking-[.25em] font-bold">
            CMS Management Module
          </span>

          <h2 class="font-display text-3xl sm:text-4xl font-bold mt-1">
            ${title}
          </h2>

          <p class="text-white/50 text-sm mt-2">
            ${subtitle}
          </p>

        </div>

        ${
          [
            'programs',
            'staff',
            'news',
            'testimonials',
            'announcements',
            'faq',
            'fees',
            'media'
          ].includes(id)

            ? `
              <button
                onclick="modal('${id}')"
                class="bg-gradient-to-r from-gold to-gold-light text-ink font-bold px-5 py-3 rounded-xl shadow-lg shadow-gold/15 flex items-center gap-2 text-sm"
              >
                <i data-lucide="plus" class="w-4 h-4"></i>
                Add New Entry
              </button>
            `
            : ''
        }

      </div>

      <div id="${id}Content"></div>

    </section>
  `;

  document
    .getElementById('dynamicSections')
    .insertAdjacentHTML('beforeend', html);

  const box = document.getElementById(id + 'Content');

  box.innerHTML = content(id, type);

  lucide.createIcons();
}


/* =========================
   CONTENT GENERATOR
========================= */

function content(id, type) {

  if (
    type === 'table' ||
    type === 'tableNews' ||
    type === 'tableMessages' ||
    type === 'tableInquiries' ||
    type === 'tableAdmins'
  ) {

    const rows = data[id] || [];

    return `
      <div class="glass rounded-3xl overflow-hidden">

        <div class="p-5 border-b border-white/10">

          <div class="relative max-w-sm">

            <i
              data-lucide="search"
              class="w-4 h-4 text-white/40 absolute left-3.5 top-3.5"
            ></i>

            <input
              class="field !pl-10 text-xs"
              placeholder="Filter rows..."
              oninput="filterRows(this)"
            >

          </div>

        </div>

        <div class="overflow-x-auto">

          <table class="w-full text-sm">

            <thead class="text-white/40 bg-black/20 text-xs uppercase tracking-wider">

              <tr>

                <th class="text-left p-4.5 font-semibold">
                  Name / Title
                </th>

                <th class="text-left p-4.5 font-semibold">
                  Category / Role
                </th>

                <th class="text-left p-4.5 font-semibold">
                  Status
                </th>

                <th class="p-4.5 text-right font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody class="divide-y divide-white/5">

              ${rows.map(row => `

                <tr class="hover:bg-white/[0.02]">

                  <td class="p-4.5 font-semibold">
                    ${row[0]}
                  </td>

                  <td class="p-4.5 text-white/60">
                    ${row[1]}
                  </td>

                  <td class="p-4.5">

                    <span class="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold border border-gold/20">
                      ${row[2]}
                    </span>

                  </td>

                  <td class="p-4.5 text-right">

                    <button
                      onclick="toast('Opened record editor interface.')"
                      class="px-3 py-1.5 rounded-lg glass-subtle text-gold text-xs font-semibold hover:border-gold/30"
                    >
                      Manage
                    </button>

                  </td>

                </tr>

              `).join('')}

            </tbody>

          </table>

        </div>

      </div>
    `;
  }


  if (
    type === 'cards' ||
    type === 'gallery' ||
    type === 'media' ||
    type === 'testimonials' ||
    type === 'announcements' ||
    type === 'fees' ||
    type === 'documents' ||
    type === 'faq'
  ) {
    return cardContent(id, type);
  }


  if (type === 'homepage') {

    return form(
      [
        'Hero headline',
        'Hero subtitle',
        'Primary button text',
        'Secondary button text'
      ],
      'Save Homepage Content'
    );
  }


  if (type === 'aboutForm') {

    return form(
      [
        'Public school introduction / story',
        'Mission statement',
        'Vision statement',
        'Core values',
        'Admission requirements',
        'Application guidelines'
      ],
      'Save Section Changes'
    );
  }


  if (type === 'prospectus') {

    return `
      <div class="grid lg:grid-cols-2 gap-6">

        <div class="glass rounded-3xl p-8 flex flex-col items-center text-center justify-center">

          <div class="w-20 h-20 rounded-2xl bg-gold/10 text-gold grid place-items-center mb-4">

            <i data-lucide="file-badge" class="w-10 h-10"></i>

          </div>

          <h3 class="font-display text-2xl font-bold">
            School-Prospectus-2026.pdf
          </h3>

          <p class="text-white/40 text-sm mt-2">
            Active official prospectus document downloaded by visitors.
          </p>

          <button
            onclick="toast('Demo: PDF file picker invoked.')"
            class="mt-6 bg-gold text-ink font-bold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-gold/20"
          >
            Replace Prospectus PDF
          </button>

        </div>

        ${form(
          [
            'Enable prospectus badge on homepage',
            'Allow public file downloads',
            'Include in public resource directory'
          ],
          'Save Prospectus Settings'
        )}

      </div>
    `;
  }


  if (type === 'seo') {

    return form(
      [
        'Homepage SEO Meta Title',
        'Meta Description URL & Text',
        'Canonical URL Link',
        'Social Sharing OpenGraph Image URL'
      ],
      'Save SEO Configurations'
    );
  }


  if (type === 'appearance') {

    return form(
      [
        'Website Brand Title',
        'Logo Asset Path',
        'Primary Brand Color Code',
        'Accent Highlight Color',
        'Footer Copyright Notice',
        'Main Header Navigation Links'
      ],
      'Save Appearance Styles'
    );
  }


  if (type === 'analytics') {

    return `
      <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

        ${
          [
            ['Unique Visitors', '8,642'],
            ['Page Views', '21,384'],
            ['Prospectus Downloads', '426'],
            ['Admission Inquiries', '38']
          ]
          .map(x => stat(x[0], x[1]))
          .join('')
        }

      </div>

      <div class="glass rounded-3xl p-6 sm:p-8 mt-6">

        <h3 class="font-display text-2xl font-bold mb-6">
          Top Public Pages
        </h3>

        <div class="space-y-5">

          ${
            [
              'Homepage',
              'Programs & Courses',
              'Admissions',
              'Prospectus',
              'About School'
            ]
            .map((x, i) => `

              <div>

                <div class="flex justify-between text-sm mb-2 font-medium">

                  <span>${x}</span>

                  <b>${7842 - i * 900} visits</b>

                </div>

                <div class="h-2 bg-white/5 rounded-full overflow-hidden">

                  <div
                    class="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                    style="width:${92 - i * 13}%"
                  ></div>

                </div>

              </div>

            `)
            .join('')
          }

        </div>

      </div>
    `;
  }


  if (type === 'settings') {

    return form(
      [
        'Website Title',
        'Primary Official Email',
        'Contact Phone Number',
        'Physical Campus Address',
        'Social Media Profiles Link',
        'System Notification Hook Email',
        'Maintenance Mode (On/Off)'
      ],
      'Save Global Settings'
    );
  }


  if (type === 'activity') {

    return `
      <div class="glass rounded-3xl p-6">

        <div class="space-y-4">

          ${
            [
              'Homepage text content updated',
              'Prospectus configurations modified',
              'Contact message inbox checked',
              'News article saved in draft mode',
              'Global SEO tags re-indexed'
            ]
            .map((x, i) => `

              <div class="glass-subtle p-4 rounded-2xl flex items-center justify-between">

                <div class="flex items-center gap-3.5">

                  <div class="w-9 h-9 rounded-xl bg-gold/10 text-gold grid place-items-center">

                    <i data-lucide="check-circle-2" class="w-4 h-4"></i>

                  </div>

                  <div>

                    <b>${x}</b>

                    <p class="text-xs text-white/40 mt-0.5">
                      Administrator • ${i + 1} hour(s) ago
                    </p>

                  </div>

                </div>

                <span class="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                  Completed
                </span>

              </div>

            `)
            .join('')
          }

        </div>

      </div>
    `;
  }


  if (type === 'newsletter') {

    return `
      <div class="glass rounded-3xl p-8">

        <div class="flex items-center justify-between mb-6">

          <div>

            <p class="text-4xl font-bold font-display text-gold">
              1,284
            </p>

            <p class="text-white/40 text-sm mt-1">
              Active newsletter subscribers on record
            </p>

          </div>

          <button
            onclick="exportCSV()"
            class="bg-gradient-to-r from-gold to-gold-light text-ink font-bold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-gold/20 flex items-center gap-2"
          >
            <i data-lucide="download" class="w-4 h-4"></i>
            Export CSV Database
          </button>

        </div>

      </div>
    `;
  }


  return form(
    [
      'Record Title',
      'Detailed Content Description'
    ],
    'Save Record Changes'
  );
}


/* =========================
   FORM
========================= */

function form(fields, button) {

  return `
    <div class="glass rounded-3xl p-6 sm:p-8 space-y-5">

      ${fields.map((field, i) => `

        <label class="block">

          <span class="block text-xs font-semibold text-white/60 mb-2">
            ${field}
          </span>

          ${
            field.includes('description') ||
            field.includes('statement') ||
            field.includes('story') ||
            field.includes('content') ||
            field.includes('requirements') ||
            field.includes('instructions')

              ? `<textarea rows="4" class="field"></textarea>`

              : `<input
                  class="field"
                  value="${
                    i === 0 &&
                    (
                      fields[0].includes('Title') ||
                      fields[0].includes('headline') ||
                      fields[0].includes('Name')
                    )
                      ? "NOAH'S ARK INTERNATIONAL SCHOOL OF HOSPITALITY AND TOURISM"
                      : ''
                  }"
                >`
          }

        </label>

      `).join('')}

      <button
        onclick="toast('Changes successfully saved to database.')"
        class="w-full sm:w-auto bg-gradient-to-r from-gold to-gold-light text-ink font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-gold/20 text-sm flex items-center justify-center gap-2"
      >
        <i data-lucide="save" class="w-4 h-4"></i>
        ${button}
      </button>

    </div>
  `;
}


/* =========================
   STAT CARD
========================= */

function stat(title, value) {

  return `
    <div class="glass rounded-3xl p-6 flex flex-col justify-between border border-gold/10">

      <p class="text-white/50 text-xs font-semibold uppercase tracking-wider">
        ${title}
      </p>

      <p class="text-3xl font-bold font-display text-gold mt-4">
        ${value}
      </p>

    </div>
  `;
}


/* =========================
   CARD CONTENT
========================= */

function cardContent(id, type) {

  const names = {

    staff: [
      'School Management',
      'Hospitality Training Team',
      'Tourism Training Team'
    ],

    gallery: [
      'Campus Overview',
      'Hospitality Training Kitchen',
      'Tourism Field Activity',
      'School Event Celebration',
      'Main Campus Building',
      'Bar & Restaurant Practice'
    ],

    media: [
      'Campus Exterior Photo',
      'Kitchen Training Class',
      'Banner Official Event',
      'Intro Video Promo',
      'Official Prospectus File'
    ],

    testimonials: [
      'Student & Alumni Review',
      'Industry Partner Statement'
    ],

    announcements: [
      'Admissions for 2026 academic year are now open',
      'Download the latest prospectus PDF guide'
    ],

    fees: [
      'Hospitality & Tourism Program Fee',
      'Registration & Application Fee',
      'Other Institutional Charges'
    ],

    faq: [
      'How can I learn about the hospitality programs?',
      'Where can I download the school prospectus?',
      'How do I contact the school administration?'
    ],

    documents: [
      'School Prospectus 2026.pdf',
      'Official Admission Guidelines.pdf'
    ]

  }[id] || [];


  return `
    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

      ${names.map(name => `

        <div class="card glass rounded-3xl p-6 flex flex-col justify-between border border-white/5">

          <div>

            <div class="w-12 h-12 rounded-2xl bg-forest-700 grid place-items-center text-gold mb-4 border border-gold/20 shadow-inner">

              <i
                data-lucide="${
                  type === 'gallery' || type === 'media'
                    ? 'image'
                    : type === 'testimonials'
                    ? 'star'
                    : type === 'faq'
                    ? 'help-circle'
                    : 'file-text'
                }"
                class="w-6 h-6"
              ></i>

            </div>

            <h3 class="font-display text-xl font-bold">
              ${name}
            </h3>

            <p class="text-sm text-white/40 mt-2">
              Active published element displayed live on the public website.
            </p>

          </div>

          <div class="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">

            <button
              onclick="toast('Demo record editor opened.')"
              class="flex-1 py-2.5 rounded-xl glass-subtle text-xs font-semibold text-gold hover:border-gold/30"
            >
              Edit Item
            </button>

            <button
              onclick="toast('Demo item deleted.')"
              class="py-2.5 px-3 rounded-xl glass-subtle text-xs font-semibold text-red-400 hover:bg-red-500/10"
            >
              Delete
            </button>

          </div>

        </div>

      `).join('')}

    </div>
  `;
}


/* =========================
   TABLE FILTER
========================= */

function filterRows(input) {

  const query = input.value.toLowerCase();

  input
    .closest('.glass')
    .querySelectorAll('tbody tr')
    .forEach(row => {

      row.style.display =
        row.innerText.toLowerCase().includes(query)
          ? ''
          : 'none';

    });
}


/* =========================
   MODAL
========================= */

function modal(kind) {

  document.getElementById('modalTitle').textContent =
    'Create New Website Record';

  document.getElementById('modalBody').innerHTML = `

    <div class="space-y-4">

      <label class="block">

        <span class="block text-xs font-semibold text-white/60 mb-2">
          Record Title / Name
        </span>

        <input
          class="field"
          placeholder="Enter title..."
        >

      </label>

      <label class="block">

        <span class="block text-xs font-semibold text-white/60 mb-2">
          Content / Description
        </span>

        <textarea
          class="field"
          rows="4"
          placeholder="Enter text or description..."
        ></textarea>

      </label>

      <label class="block">

        <span class="block text-xs font-semibold text-white/60 mb-2">
          Asset Image or File Path
        </span>

        <input
          class="field"
          placeholder="/assets/images/..."
        >

      </label>

      <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">

        <button
          onclick="closeModal()"
          class="px-5 py-3 rounded-xl glass-subtle text-sm font-semibold"
        >
          Cancel
        </button>

        <button
          onclick="closeModal();toast('Record successfully created in demo mode.')"
          class="bg-gradient-to-r from-gold to-gold-light text-ink font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-gold/20"
        >
          Save Record
        </button>

      </div>

    </div>

  `;

  const modalBox = document.getElementById('modal');

  modalBox.classList.remove('hidden');
  modalBox.classList.add('flex');

  lucide.createIcons();
}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

  const modalBox = document.getElementById('modal');

  modalBox.classList.add('hidden');
  modalBox.classList.remove('flex');
}


/* =========================
   TOAST
========================= */

function toast(message) {

  const toastBox = document.getElementById('toast');

  toastBox.innerHTML = `
    <i
      data-lucide="check-circle"
      class="w-5 h-5 text-gold shrink-0"
    ></i>

    <span>${message}</span>
  `;

  toastBox.classList.remove('hidden');

  lucide.createIcons();

  setTimeout(() => {
    toastBox.classList.add('hidden');
  }, 3000);
}


/* =========================
   EXPORT CSV
========================= */

function exportCSV() {

  const blob = new Blob(
    [
      'Email Subscriber\n' +
      'subscriber1@noahsark.rw\n' +
      'subscriber2@noahsark.rw\n'
    ],
    {
      type: 'text/csv'
    }
  );

  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);

  link.download = 'noahs-ark-subscribers.csv';

  link.click();
}


/* =========================
   SIDEBAR
========================= */

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('menu');


function openSide() {

  sidebar.classList.remove('closed');

  overlay.classList.remove('hidden');
}


function closeSide() {

  sidebar.classList.add('closed');

  overlay.classList.add('hidden');
}


menu.onclick = openSide;

overlay.onclick = closeSide;


/* =========================
   DASHBOARD INITIALIZATION
========================= */

document.getElementById('stats').innerHTML = [

  ['Website Visitors', '8,642'],
  ['Page Views', '21,384'],
  ['Prospectus Downloads', '426'],
  ['Admission Inquiries', '38']

]
.map(x => stat(x[0], x[1]))
.join('');


document.getElementById('bars').innerHTML = [

  35,
  48,
  42,
  68,
  57,
  82,
  74

]
.map(h => `

  <div
    class="flex-1 rounded-t-xl bg-gradient-to-t from-gold/10 to-gold/40 border-t border-gold/40 transition-all hover:bg-gold/60"
    style="height:${h}%"
  ></div>

`)
.join('');


document.getElementById('health').innerHTML = [

  ['Content published index', 92],
  ['SEO configuration score', 78],
  ['Media library organization', 86],
  ['Accessibility compliance', 84]

]
.map(x => `

  <div>

    <div class="flex justify-between text-sm mb-2 font-medium">

      <span>${x[0]}</span>

      <b>${x[1]}%</b>

    </div>

    <div class="h-2 bg-white/5 rounded-full overflow-hidden">

      <div
        class="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
        style="width:${x[1]}%"
      ></div>

    </div>

  </div>

`)
.join('');


document.getElementById('activity').innerHTML = [

  'Homepage content updated successfully',
  'Prospectus viewer settings checked',
  'Contact message marked as read',
  'News article draft saved'

]
.map((text, i) => `

  <div class="glass-subtle p-4 rounded-2xl flex items-center justify-between">

    <div class="flex items-center gap-3.5">

      <div class="w-9 h-9 rounded-xl bg-gold/10 text-gold grid place-items-center">

        <i
          data-lucide="clock"
          class="w-4 h-4"
        ></i>

      </div>

      <div>

        <b class="text-sm">
          ${text}
        </b>

        <p class="text-xs text-white/40 mt-0.5">
          Administrator • ${i + 1} hour(s) ago
        </p>

      </div>

    </div>

    <span class="text-xs text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20 font-medium">
      System
    </span>

  </div>

`)
.join('');


/* =========================
   START DASHBOARD
========================= */

buildNav();

lucide.createIcons();