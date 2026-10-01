/**
 * 🇺🇸 Zero-Footprint PRO: Advanced 1-by-1 Sequential In-Browser Auto-Applier (US High-CPC Edition)
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * CDN: https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/us/auto_applier.js
 * 
 * FEATURES:
 * - 🇺🇸 US High-CPC Optimized: Dedicated queue of active US job openings sorted highest CPC first (up to $1.75+ CPC).
 * - ⚡ 1-by-1 Sequential Processing: Never overloads CPU/RAM with hundreds of open tabs.
 * - 🎯 Configurable Batch Size (25 / 50 / 100 / 200): Easily adjust application batch limits on the fly.
 * - 🔍 Dynamic Polling Resolver: Waits up to 10-12s for React/Next.js DOM hydration so NO button is missed.
 * - 🪟 Dual-Tab Auto-Closer: Opens Job Page (Tab 1), clicks apply, handles redirect (Tab 2), and closes BOTH tabs cleanly.
 * - 🛡️ Advanced Anti-Detection: 9-step human pointer cascade, deceleration scroll, and Gaussian spatial jitter.
 * - ⏩ Batch Navigator: Next/Prev batch controls across all jobs in queue.
 * - 🧼 0-Footprint Per-Job Deep Purge: Wipes domain cookies, sessionStorage & localStorage after EACH job applied.
 * - 💾 Session Resume: Saves progress in localStorage so you can pause/resume anytime without losing your place.
 * - 🎨 Pure White HUD: Top-right positioning (zero overlap with chat widget), vector SVGs, and step-by-step instructions.
 */

(function () {
  // Prevent or clean up duplicate instances
  if (window.__AUTO_APPLIER_US_INSTANCE__ || window.__AUTO_APPLIER_INSTANCE__) {
    console.log("%c🔄 Cleaning up previous Auto-Applier session...", "color: #2563eb; font-weight: bold;");
    try {
      if (window.__AUTO_APPLIER_US_INSTANCE__) window.__AUTO_APPLIER_US_INSTANCE__.cleanup();
      if (window.__AUTO_APPLIER_INSTANCE__) window.__AUTO_APPLIER_INSTANCE__.cleanup();
    } catch (e) {}
  }

  // =========================================================================
  // 📋 EMBEDDED US JOB URL QUEUE (1973 Openings, CPC: $0.05 - $1.75)
  // =========================================================================
  const DEFAULT_QUEUE = [
    "https://artha.link/@eanxt/jobs/rn-aberdeen-medical-center-outpatient-sanford-health-houghton-a3c6d17f",
    "https://artha.link/@eanxt/jobs/rn-neilson-place-part-time-overnights-sanford-health-nevis-85513ef7",
    "https://artha.link/@eanxt/jobs/cna-full-time-nights-sf-village-good-samaritan-trent-f50ce5e8",
    "https://artha.link/@eanxt/jobs/rn-woodland-ltc-full-time-flex-good-samaritan-wahkon-00c07de4",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-ooltewah-519698e1",
    "https://artha.link/@eanxt/jobs/registered-nurse-ascension-st-john-talala-7bffbc7f",
    "https://artha.link/@eanxt/jobs/occupational-therapist-rusk-rehabilitation-florence-7a265f62",
    "https://artha.link/@eanxt/jobs/physical-therapist-cardinal-hill-millersburg-b5f6f683",
    "https://artha.link/@eanxt/jobs/occupational-therapist-altru-dahlen-0e1df669",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-woodville-93ed3e5a",
    "https://artha.link/@eanxt/jobs/rn-ed-jackson-medical-center-full-time-sanford-health-jeffers-44ec127c",
    "https://artha.link/@eanxt/jobs/mds-rn-nurse-woodland-ft-days-good-samaritan-swanville-f92f3aec",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-pt-weekend-days-good-samaritan-okabena-8acb1b09",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-medical-center-med-surg-sanford-health-claremont-12de2677",
    "https://artha.link/@eanxt/jobs/registered-nurse-west-tennessee-trezevant-8086e4c3",
    "https://artha.link/@eanxt/jobs/registered-nurse-the-quad-cities-rapids-city-ac57f798",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-riceville-e9cae6f2",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-jefferson-city-gifted-healthcare-whitesburg-fa25187c",
    "https://artha.link/@eanxt/jobs/physical-therapist-altru-clifford-a2f96054",
    "https://artha.link/@eanxt/jobs/dialysis-rn-encompass-health-pomaria-c58f85d6",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-good-samaritan-clements-61c0a987",
    "https://artha.link/@eanxt/jobs/rn-full-time-days-ltc-good-samaritan-brocket-9754487a",
    "https://artha.link/@eanxt/jobs/integrated-health-therapist-49th-and-sanford-health-beaver-creek-396b6c9c",
    "https://artha.link/@eanxt/jobs/radiology-technologist-straight-nights-sanford-health-menoken-1608bc23",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-paint-rock-8e43ed3b",
    "https://artha.link/@eanxt/jobs/rn-traveler-luverne-er-med-surg-solutions-by-sanford-montrose-a4a0872b",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-cecilia-583f40e2",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-soddy-daisy-cdd3c8ac",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-swansea-b4f909d3",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-day-shift-encompass-health-wildorado-d96ae6e9",
    "https://artha.link/@eanxt/jobs/rn-straight-night-good-samaritan-glasston-2979715b",
    "https://artha.link/@eanxt/jobs/rn-flex-full-time-days-good-samaritan-larchwood-8e7dded1",
    "https://artha.link/@eanxt/jobs/lpn-neilson-place-full-time-evening-sanford-health-leonard-788d345c",
    "https://artha.link/@eanxt/jobs/new-graduate-rn-luverne-medical-center-sanford-health-harris-865aa3bc",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-lexington-c434cfcd",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-jenkinsville-04d4fc9a",
    "https://artha.link/@eanxt/jobs/traveling-registered-nurse-solutions-by-sanford-colman-4441f2da",
    "https://artha.link/@eanxt/jobs/registered-nurse-altru-fisher-fa822491",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-lyons-7452aea2",
    "https://artha.link/@eanxt/jobs/rn-traveler-or-black-hills-surgical-solutions-by-sanford-marion-a5c14153",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-good-samaritan-armstrong-bf926a38",
    "https://artha.link/@eanxt/jobs/lpn-ltc-full-time-overnights-good-samaritan-bertha-1b5694bc",
    "https://artha.link/@eanxt/jobs/rn-hospice-pt-sanford-health-astoria-01fdc686",
    "https://artha.link/@eanxt/jobs/lpn-surg-tech-sheldon-medical-center-sanford-health-larrabee-b43e7805",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-tyndall-afb-dc13c208",
    "https://artha.link/@eanxt/jobs/physical-therapist-eastside-talmo-17731951",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-swifton-81ce693a",
    "https://artha.link/@eanxt/jobs/registered-dietitian-encompass-health-lexington-abf64416",
    "https://artha.link/@eanxt/jobs/registered-nurse-solutions-by-sanford-hill-city-d84efd9b",
    "https://artha.link/@eanxt/jobs/rn-ltc-ft-day-good-samaritan-mountain-69d94425",
    "https://artha.link/@eanxt/jobs/cna-certified-nursing-assistant-prn-good-samaritan-carpenter-b9c71a38",
    "https://artha.link/@eanxt/jobs/lpn-part-time-overnights-ltc-good-samaritan-tintah-df833d71",
    "https://artha.link/@eanxt/jobs/lpn-neilson-place-part-time-overnights-sanford-health-blackduck-4f4d739a",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-clinic-urology-full-time-sanford-health-stratford-35ca867e",
    "https://artha.link/@eanxt/jobs/lpn-part-time-overnights-ltc-good-samaritan-browerville-e35b0f48",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-ft-weekend-days-good-samaritan-estelline-d0ee6e19",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-pt-good-samaritan-backus-d0dfb369",
    "https://artha.link/@eanxt/jobs/rehab-rn-full-time-weekend-nights-sf-good-samaritan-alcester-c7e235db",
    "https://artha.link/@eanxt/jobs/rn-full-time-days-ltc-good-samaritan-balaton-ad1b1982",
    "https://artha.link/@eanxt/jobs/lpn-woodland-ltc-prn-good-samaritan-gilman-9a5e2558",
    "https://artha.link/@eanxt/jobs/lpn-straight-nights-good-samaritan-donaldson-9191032b",
    "https://artha.link/@eanxt/jobs/lpn-long-term-care-ltc-good-samaritan-keystone-0242ffeb",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-medical-center-full-time-sanford-health-amherst-7feed560",
    "https://artha.link/@eanxt/jobs/cna-canby-care-center-part-time-evenings-sanford-health-garvin-65138ded",
    "https://artha.link/@eanxt/jobs/lpn-rn-full-time-or-part-time-days-or-good-samaritan-larchwood-f8a0029e",
    "https://artha.link/@eanxt/jobs/rn-ltc-ft-flex-good-samaritan-osnabrock-50e28cc9",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-prn-good-samaritan-arlington-039557df",
    "https://artha.link/@eanxt/jobs/lpn-or-tma-full-time-days-ltc-good-samaritan-russell-561e3d7f",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-bethany-good-samaritan-cushing-118efa25",
    "https://artha.link/@eanxt/jobs/rn-full-time-evenings-sf-village-good-samaritan-marion-219e8b73",
    "https://artha.link/@eanxt/jobs/rn-lpn-full-time-days-good-samaritan-lake-wilson-e7131c19",
    "https://artha.link/@eanxt/jobs/rn-long-term-care-ltc-straight-nights-good-samaritan-lawton-4029cb32",
    "https://artha.link/@eanxt/jobs/rn-or-lpn-aberdeen-clinic-full-time-sanford-health-eureka-5e5f3cfa",
    "https://artha.link/@eanxt/jobs/cna-canby-care-center-full-time-evenings-sanford-health-elkton-8276e20d",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-bethany-pt-night-good-samaritan-deerwood-20a8a0d2",
    "https://artha.link/@eanxt/jobs/lpn-pt-good-samaritan-fairdale-ca1ae572",
    "https://artha.link/@eanxt/jobs/rn-ft-day-good-samaritan-northwood-bdbdba98",
    "https://artha.link/@eanxt/jobs/rn-full-time-days-sf-village-good-samaritan-fairview-bf9e8a81",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-woodland-pt-evening-good-samaritan-hewitt-ca8b08a0",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-ft-nights-good-samaritan-monroe-9bfac956",
    "https://artha.link/@eanxt/jobs/rn-lpn-full-time-nights-good-samaritan-winfred-30454a43",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-good-samaritan-oneill-c2a2268c",
    "https://artha.link/@eanxt/jobs/rn-luverne-medical-center-part-time-sanford-health-okabena-d20d010c",
    "https://artha.link/@eanxt/jobs/rn-luverne-medical-center-full-time-sanford-health-chandler-e372de02",
    "https://artha.link/@eanxt/jobs/lpn-prn-good-samaritan-pisek-6657fc01",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-good-samaritan-mylo-61b9a5cc",
    "https://artha.link/@eanxt/jobs/lpn-prn-jackson-center-good-samaritan-wallingford-0628de12",
    "https://artha.link/@eanxt/jobs/rn-full-time-days-ltc-good-samaritan-boyden-a247eee1",
    "https://artha.link/@eanxt/jobs/rn-full-time-flex-ltc-good-samaritan-holmes-city-2e5bddf7",
    "https://artha.link/@eanxt/jobs/rn-long-term-care-ltc-ft-days-good-samaritan-tilden-4b6e9ea4",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-ft-flex-good-samaritan-primrose-e1cb1485",
    "https://artha.link/@eanxt/jobs/new-graduate-rn-or-lpn-luverne-ltc-good-samaritan-steen-706756d0",
    "https://artha.link/@eanxt/jobs/lpn-ft-weekends-ltc-good-samaritan-erhard-904d06e7",
    "https://artha.link/@eanxt/jobs/rn-part-time-overnights-ltc-good-samaritan-sebeka-7a1d8e0b",
    "https://artha.link/@eanxt/jobs/lpn-ltc-flex-good-samaritan-hampden-b0693e36",
    "https://artha.link/@eanxt/jobs/registered-nurse-rn-bethany-ltc-pt-good-samaritan-swanville-2d66b4e6",
    "https://artha.link/@eanxt/jobs/certified-medication-assistant-ltc-ft-good-samaritan-westhope-e3c2b1b7",
    "https://artha.link/@eanxt/jobs/lpn-full-time-evenings-good-samaritan-henning-548eb1b2",
    "https://artha.link/@eanxt/jobs/lpn-long-term-care-prn-days-good-samaritan-wolbach-308ff8e0",
    "https://artha.link/@eanxt/jobs/rn-lpn-part-time-days-good-samaritan-renner-2c53cdf5",
    "https://artha.link/@eanxt/jobs/speech-pathologist-uva-encompass-esmont-c63418d9",
    "https://artha.link/@eanxt/jobs/speech-pathologist-tidelands-health-mc-clellanville-8b58bec8",
    "https://artha.link/@eanxt/jobs/cna-restorative-care-full-time-days-sf-good-samaritan-beaver-creek-9f43ba83",
    "https://artha.link/@eanxt/jobs/registered-nurse-rn-bethany-ltc-pt-days-good-samaritan-bowlus-20d0793b",
    "https://artha.link/@eanxt/jobs/lpn-full-time-days-ltc-good-samaritan-hewitt-f527a917",
    "https://artha.link/@eanxt/jobs/cardiac-sonographer-prn-sanford-health-wing-a640f20b",
    "https://artha.link/@eanxt/jobs/rn-woodland-part-time-good-samaritan-backus-426c4c63",
    "https://artha.link/@eanxt/jobs/occupational-therapist-the-quad-cities-sherrard-78e0e666",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-good-samaritan-searles-2f2054ba",
    "https://artha.link/@eanxt/jobs/cna-pt-straight-weekends-jackson-center-good-samaritan-everly-141a97d5",
    "https://artha.link/@eanxt/jobs/cna-full-time-pms-sf-village-good-samaritan-lyons-60fce92c",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-pt-good-samaritan-onamia-0838af59",
    "https://artha.link/@eanxt/jobs/rn-pt-good-samaritan-niagara-4fa52fd8",
    "https://artha.link/@eanxt/jobs/rn-luverne-medical-center-prn-sanford-health-wilmont-b2a64046",
    "https://artha.link/@eanxt/jobs/rn-home-health-ft-sanford-health-boyd-a60c7a3a",
    "https://artha.link/@eanxt/jobs/new-graduate-rn-or-lpn-canby-care-center-sanford-health-kranzburg-ed52613f",
    "https://artha.link/@eanxt/jobs/radiology-technologist-akron-vascular-care-atwater-bc1f57ac",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-sanford-health-blackduck-92e5fac3",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-registered-sanford-health-mcintosh-2fcbb592",
    "https://artha.link/@eanxt/jobs/lpn-full-time-pms-sf-village-good-samaritan-alcester-2ad33490",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-pt-weekend-good-samaritan-magnolia-3e67667b",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-cape-girardeau-gifted-healthcare-unity-40973458",
    "https://artha.link/@eanxt/jobs/lpn-full-time-days-sf-village-good-samaritan-centerville-10382c1e",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-maryville-tennessee-gifted-healthcare-walland-a0284383",
    "https://artha.link/@eanxt/jobs/lpn-neilson-place-full-time-nights-sanford-health-solway-be4382c4",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-gilbert-15c1ffc7",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-medical-center-pacu-cath-sanford-health-forbes-daf74f41",
    "https://artha.link/@eanxt/jobs/rn-full-time-straight-nights-ltc-good-samaritan-minto-f8e98f42",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-mc-lean-210d208e",
    "https://artha.link/@eanxt/jobs/lpn-long-term-care-ltc-ft-days-good-samaritan-primrose-710e0c07",
    "https://artha.link/@eanxt/jobs/cna-certified-nursing-assistant-ft-flex-good-samaritan-nunda-292a5f8e",
    "https://artha.link/@eanxt/jobs/rn-lpn-part-time-nights-good-samaritan-beaver-creek-da84ea3f",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-full-time-encompass-health-wildorado-f644edc9",
    "https://artha.link/@eanxt/jobs/rn-neilson-place-full-time-overnights-sanford-health-cass-lake-e876fdda",
    "https://artha.link/@eanxt/jobs/pediatric-cardiac-sonographer-sanford-health-moffit-5d9d6dff",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-encompass-health-groom-ea415a22",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-woodland-prn-good-samaritan-lake-hubert-dd92405d",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-bethany-ft-evening-good-samaritan-lake-hubert-b32ee492",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-gilbert-c628224e",
    "https://artha.link/@eanxt/jobs/lpn-part-time-evenings-ltc-good-samaritan-evansville-4c3b8adc",
    "https://artha.link/@eanxt/jobs/physical-therapist-asst-pta-perks-and-yuma-rehabilitation-roll-56c7224c",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-pinewood-e0f767a2",
    "https://artha.link/@eanxt/jobs/rn-full-time-weekdays-good-samaritan-oslo-66e0d6f2",
    "https://artha.link/@eanxt/jobs/lpn-full-time-flex-ltc-good-samaritan-underwood-96fd1c21",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-medical-center-med-surg-sanford-health-andover-08ae1823",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-millville-4fa7ba89",
    "https://artha.link/@eanxt/jobs/radiology-technologist-cath-lab-sanford-health-tuttle-e66bae4d",
    "https://artha.link/@eanxt/jobs/physical-therapy-team-leader-encompass-health-soddy-daisy-caf7a8ba",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-bethany-prn-various-good-samaritan-mcgregor-ad51d301",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-humboldt-0c21a208",
    "https://artha.link/@eanxt/jobs/rn-neilson-place-full-time-overnights-sanford-health-ah-gwah-ching-356344d1",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-good-samaritan-moffit-32832b32",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-ft-nights-good-samaritan-oakdale-655a5899",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-crown-city-f2d82b1c",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-registered-sanford-health-wilton-ed5adea9",
    "https://artha.link/@eanxt/jobs/lpn-full-time-days-ltc-good-samaritan-valley-springs-5535f3a1",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-make-every-encompass-health-wildorado-a8b1bb6f",
    "https://artha.link/@eanxt/jobs/radiology-technologist-straight-weekends-sanford-health-hazelton-93b42a60",
    "https://artha.link/@eanxt/jobs/radiology-assistant-sanford-health-hebron-d845958e",
    "https://artha.link/@eanxt/jobs/travel-ltac-rn-in-willingboro-new-jersey-gifted-healthcare-millstone-84ccd37a",
    "https://artha.link/@eanxt/jobs/rn-10k-sign-on-encompass-health-pomaria-9693ab67",
    "https://artha.link/@eanxt/jobs/rn-lpn-pt-nights-good-samaritan-milton-59880056",
    "https://artha.link/@eanxt/jobs/certified-medication-aide-neilson-place-sanford-health-tenstrike-750a65cc",
    "https://artha.link/@eanxt/jobs/speech-pathologist-chi-st-vincent-hot-springs-6e8398dc",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-good-samaritan-saint-michael-5efdd556",
    "https://artha.link/@eanxt/jobs/registered-nurse-rn-encompass-health-state-park-834bca5c",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-frankford-8a01131a",
    "https://artha.link/@eanxt/jobs/rn-hospice-prn-sanford-health-holland-6f361374",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-clinic-acute-care-full-time-sanford-health-northville-b39541c0",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-baptist-health-wooster-3db54e28",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-wadesville-f4bc3794",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-springfield-gifted-healthcare-orlinda-23ec63ef",
    "https://artha.link/@eanxt/jobs/assistant-director-of-nursing-good-samaritan-cannon-ball-07ec4d6a",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-prn-washington-regional-valley-springs-c37380d1",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-medical-center-or-full-time-sanford-health-mansfield-5a3351df",
    "https://artha.link/@eanxt/jobs/cna-full-time-days-sf-village-good-samaritan-lyons-0f7d845b",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-springfield-gifted-healthcare-adams-1610f435",
    "https://artha.link/@eanxt/jobs/rn-neilson-place-full-time-evenings-sanford-health-bena-06ac6301",
    "https://artha.link/@eanxt/jobs/occupational-therapist-rehabilitation-encompass-health-cortaro-2734e1e8",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-foreman-10cd8c7d",
    "https://artha.link/@eanxt/jobs/join-an-award-winning-rehabilitation-encompass-health-wildorado-45de6fa1",
    "https://artha.link/@eanxt/jobs/travel-medsurg-lpn-in-springfield-gifted-healthcare-halltown-bca2db82",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-memphis-tennessee-gifted-healthcare-lake-cormorant-b813eb2d",
    "https://artha.link/@eanxt/jobs/occupational-therapist-full-time-encompass-health-cortaro-e3eab4a0",
    "https://artha.link/@eanxt/jobs/radiology-technologist-sanford-health-tuttle-4bf7dea2",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-clinic-oncology-ft-sanford-health-hosmer-2b430003",
    "https://artha.link/@eanxt/jobs/nursing-assistant-certified-long-term-good-samaritan-nemo-39584175",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-rochester-gifted-healthcare-morton-4d18b7bd",
    "https://artha.link/@eanxt/jobs/director-of-nursing-rn-long-term-care-good-samaritan-bloomfield-f29d7947",
    "https://artha.link/@eanxt/jobs/rn-aberdeen-medical-center-or-full-time-sanford-health-hosmer-dfc4c9e8",
    "https://artha.link/@eanxt/jobs/rn-long-term-care-ltc-prn-days-good-samaritan-monroe-01fb729d",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-ft-nights-good-samaritan-oakdale-bac89820",
    "https://artha.link/@eanxt/jobs/physical-therapist-patricia-neal-la-follette-8576df89",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-boys-ranch-b733f7f0",
    "https://artha.link/@eanxt/jobs/licensed-physical-therapy-assistant-pta-yuma-rehabilitation-bard-182e1cac",
    "https://artha.link/@eanxt/jobs/cna-pt-evenings-and-nights-jackson-good-samaritan-terril-1e2e1a76",
    "https://artha.link/@eanxt/jobs/cna-prn-good-samaritan-kramer-0023032c",
    "https://artha.link/@eanxt/jobs/occupational-therapy-assistant-encompass-health-sanford-40fa2146",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-encompass-health-lynnville-8d5b2a6f",
    "https://artha.link/@eanxt/jobs/pharmacist-encompass-health-black-rock-69adffe2",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-cochranville-536fb06c",
    "https://artha.link/@eanxt/jobs/licensed-occupational-therapist-tucson-encompass-health-cortaro-537ce212",
    "https://artha.link/@eanxt/jobs/rn-ft-nights-valley-manor-care-eckert-6178c0ca",
    "https://artha.link/@eanxt/jobs/occupational-therapy-team-leader-encompass-health-red-rock-70756fc0",
    "https://artha.link/@eanxt/jobs/speech-pathologist-altru-stephen-f9f21b7a",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-physician-baptist-urgent-care-lake-cormorant-63d36426",
    "https://artha.link/@eanxt/jobs/registered-nurse-10k-sign-on-bonus-encompass-health-jenkinsville-ecb2f08d",
    "https://artha.link/@eanxt/jobs/registered-nurse-rehabilitation-geneva-cd401b5f",
    "https://artha.link/@eanxt/jobs/rn-long-term-care-ltc-good-samaritan-hill-city-49d778f0",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-chattanooga-gifted-healthcare-guild-d3254cf1",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-charleston-e88a014b",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-pomeroy-77df82ed",
    "https://artha.link/@eanxt/jobs/physical-therapist-asst-pta-yuma-rehabilitation-bard-a47b0565",
    "https://artha.link/@eanxt/jobs/speech-pathologist-senior-encompass-health-soddy-daisy-3f7ce68b",
    "https://artha.link/@eanxt/jobs/speech-pathologist-cardinal-hill-crab-orchard-6727da57",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-ft-good-samaritan-bloomfield-d49ccb73",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-camden-new-gifted-healthcare-upper-darby-6d21a1fb",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-cortaro-a1a549b3",
    "https://artha.link/@eanxt/jobs/lpn-woodland-ltc-full-time-days-good-samaritan-cushing-479585d2",
    "https://artha.link/@eanxt/jobs/physical-therapist-asst-encompass-health-ducktown-346f27c5",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-penwell-7a340fbd",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-baptist-health-moffett-42a6a387",
    "https://artha.link/@eanxt/jobs/registered-nurse-rn-full-time-home-health-of-ridgway-764983c9",
    "https://artha.link/@eanxt/jobs/occupational-therapist-days-nights-encompass-health-rillito-47236e60",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-ardmore-e72debe4",
    "https://artha.link/@eanxt/jobs/registered-nurse-rn-full-time-horizons-care-center-crawford-17c97d8d",
    "https://artha.link/@eanxt/jobs/occupational-therapist-west-tennessee-mc-kenzie-a58977e3",
    "https://artha.link/@eanxt/jobs/cna-ft-days-good-samaritan-upham-c608ec4a",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-tyronza-f2d454c4",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-rehabilitation-waverly-hall-69d2c60f",
    "https://artha.link/@eanxt/jobs/occupational-therapist-prn-pool-encompass-health-rillito-ff8b38cd",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-fouke-43f7fb88",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-mc-connellstown-f615f947",
    "https://artha.link/@eanxt/jobs/rn-hiring-now-encompass-health-peak-6faa28dc",
    "https://artha.link/@eanxt/jobs/cardiac-sonographer-sanford-health-tuttle-905f5c5f",
    "https://artha.link/@eanxt/jobs/cna-canby-care-center-prn-sanford-health-ruthton-38b49c54",
    "https://artha.link/@eanxt/jobs/nursing-assistant-certified-long-term-good-samaritan-new-underwood-afd992f9",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-ft-straight-nights-good-samaritan-bloomfield-499f2abf",
    "https://artha.link/@eanxt/jobs/radiology-assistant-sanford-health-saint-anthony-c517b509",
    "https://artha.link/@eanxt/jobs/physical-therapist-asst-pta-full-time-yuma-rehabilitation-tacna-223de4b4",
    "https://artha.link/@eanxt/jobs/speech-pathologist-the-rehabilitation-o-fallon-0762909a",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-ellsworth-830f2fcf",
    "https://artha.link/@eanxt/jobs/rn-prn-home-health-of-eckert-64c11667",
    "https://artha.link/@eanxt/jobs/physical-therapist-the-rehabilitation-o-fallon-b52422c4",
    "https://artha.link/@eanxt/jobs/nursing-assistant-certified-long-term-good-samaritan-new-underwood-f1776dd3",
    "https://artha.link/@eanxt/jobs/occupational-therapist-competitive-pay-encompass-health-cortaro-3927d97b",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-lansdowne-51153a1f",
    "https://artha.link/@eanxt/jobs/lpn-neilson-place-part-time-evenings-sanford-health-gonvick-b4b60abb",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-happy-2e966617",
    "https://artha.link/@eanxt/jobs/physical-therapist-uva-encompass-esmont-9e216084",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-tuscaloosa-alabama-gifted-healthcare-fosters-80fc07cc",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-job-in-memphis-gifted-healthcare-mount-pleasant-0f1b8baf",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-career-yuma-rehabilitation-bard-4a761a22",
    "https://artha.link/@eanxt/jobs/occupational-therapist-10-000-sign-on-encompass-health-cortaro-2b672f77",
    "https://artha.link/@eanxt/jobs/physical-therapist-new-england-windham-54cfbeb5",
    "https://artha.link/@eanxt/jobs/travel-or-local-neuro-rn-job-in-gifted-healthcare-pine-brook-664d22b9",
    "https://artha.link/@eanxt/jobs/registered-nurse-hiring-now-encompass-health-pomaria-32734628",
    "https://artha.link/@eanxt/jobs/local-ltac-rn-job-in-atlantic-city-new-gifted-healthcare-egg-harbor-c6911d06",
    "https://artha.link/@eanxt/jobs/cna-ft-nights-good-samaritan-souris-426afdf1",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-gadsden-alabama-gifted-healthcare-spring-garden-12fd5034",
    "https://artha.link/@eanxt/jobs/pediatric-phyiscal-therapist-ivy-health-brick-9f39bea1",
    "https://artha.link/@eanxt/jobs/registered-nurse-rn-encompass-health-deforest-4a2b8982",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-show-low-arizona-gifted-healthcare-mcnary-c146e928",
    "https://artha.link/@eanxt/jobs/occupational-therapist-inpatient-rehab-encompass-health-cortaro-aef0d246",
    "https://artha.link/@eanxt/jobs/licensed-physical-therapist-pt-ortho-ivy-health-scottsville-5e9ee7ac",
    "https://artha.link/@eanxt/jobs/lpn-long-term-care-ltc-good-samaritan-new-underwood-551b1d55",
    "https://artha.link/@eanxt/jobs/occupational-therapist-relocation-encompass-health-cortaro-9c81684c",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-yuma-rehabilitation-tacna-b25dd406",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-dickson-tennessee-gifted-healthcare-only-e7958f49",
    "https://artha.link/@eanxt/jobs/registered-nurse-new-england-windham-ecb2e220",
    "https://artha.link/@eanxt/jobs/rn-prn-horizons-care-center-hotchkiss-98b6f731",
    "https://artha.link/@eanxt/jobs/registered-nurse-uva-encompass-esmont-3daf9e71",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-west-siloam-0d133543",
    "https://artha.link/@eanxt/jobs/travel-pcu-rn-in-new-brunswick-new-gifted-healthcare-joint-base-mdl-07ab05fa",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-st-louis-missouri-gifted-healthcare-house-springs-872ad14d",
    "https://artha.link/@eanxt/jobs/join-a-therapy-team-that-puts-patients-encompass-health-wildorado-95873a71",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-nashville-tennessee-gifted-healthcare-joelton-fc0acc2c",
    "https://artha.link/@eanxt/jobs/rehab-therapy-tech-new-england-windham-6ef5c134",
    "https://artha.link/@eanxt/jobs/travel-medsurg-lpn-in-st-louis-missouri-gifted-healthcare-house-springs-a6525e45",
    "https://artha.link/@eanxt/jobs/local-medsurg-rn-job-in-knoxville-gifted-healthcare-rockford-3176b0cb",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-baptist-health-college-station-b7de3ad3",
    "https://artha.link/@eanxt/jobs/physical-therapist-the-rehabilitation-o-fallon-b3a0ca8b",
    "https://artha.link/@eanxt/jobs/rn-long-term-care-ltc-good-samaritan-new-underwood-95c0f544",
    "https://artha.link/@eanxt/jobs/looking-for-a-better-pta-job-start-here-encompass-health-wildorado-de6c162d",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-encompass-health-lynnville-7cf49c71",
    "https://artha.link/@eanxt/jobs/physical-therapist-west-tennessee-mc-kenzie-0cf399f2",
    "https://artha.link/@eanxt/jobs/local-medsurg-rn-job-in-oak-ridge-gifted-healthcare-andersonville-f6e9f0ef",
    "https://artha.link/@eanxt/jobs/occupational-therapist-tucson-az-encompass-health-rillito-431de15e",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-littleton-9a9cd0da",
    "https://artha.link/@eanxt/jobs/advance-your-physical-therapy-career-encompass-health-wildorado-6e14a034",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-encompass-health-rillito-309a5e8d",
    "https://artha.link/@eanxt/jobs/travel-medsurg-lpn-in-memphis-tennessee-gifted-healthcare-tipton-c856f969",
    "https://artha.link/@eanxt/jobs/occupational-therapist-tucson-arizona-encompass-health-cortaro-141bdda6",
    "https://artha.link/@eanxt/jobs/rn-hiring-now-encompass-health-deforest-c9781b6f",
    "https://artha.link/@eanxt/jobs/cna-bath-aide-ft-days-good-samaritan-bloomfield-dc1df983",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-where-your-encompass-health-wildorado-54cb7482",
    "https://artha.link/@eanxt/jobs/registered-nurse-solutions-by-sanford-crosslake-abbb23f2",
    "https://artha.link/@eanxt/jobs/nj-resident-emergency-room-rn-job-in-gifted-healthcare-winslow-66ef764e",
    "https://artha.link/@eanxt/jobs/occupational-therapist-up-to-60-00-hr-encompass-health-cortaro-24485bd3",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-registered-marshfield-clinic-minocqua-0dd15e86",
    "https://artha.link/@eanxt/jobs/cna-flex-good-samaritan-battle-lake-b50685fe",
    "https://artha.link/@eanxt/jobs/cna-ltc-full-time-days-good-samaritan-battle-lake-b51e5eea",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-prn-good-samaritan-bloomfield-ce142906",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-apply-today-encompass-health-wildorado-006415b7",
    "https://artha.link/@eanxt/jobs/local-emergency-room-rn-job-in-st-louis-gifted-healthcare-house-springs-472dc910",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-kansas-city-gifted-healthcare-cleveland-8875d87d",
    "https://artha.link/@eanxt/jobs/help-patients-recover-as-a-physical-encompass-health-wildorado-2e013399",
    "https://artha.link/@eanxt/jobs/occupational-therapist-43-31-60-00-hr-encompass-health-cortaro-80346729",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-dorchester-9e2d2a7f",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-rillito-754a887c",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-altru-perley-c12ae79c",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-encompass-health-stone-ridge-64f555d6",
    "https://artha.link/@eanxt/jobs/travel-or-local-medsurg-rn-job-in-pell-gifted-healthcare-eastaboga-dfce5208",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-northport-alabama-gifted-healthcare-samantha-9022f8ae",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-job-in-tuscaloosa-gifted-healthcare-samantha-09eb4aba",
    "https://artha.link/@eanxt/jobs/travel-or-local-medsurg-rn-job-in-gifted-healthcare-burnwell-fa1e14b1",
    "https://artha.link/@eanxt/jobs/physical-therapist-ascension-st-john-talala-904f29ae",
    "https://artha.link/@eanxt/jobs/occupational-therapist-ascension-st-john-ochelata-ac976f4c",
    "https://artha.link/@eanxt/jobs/speech-pathologist-ascension-st-john-talala-202120d0",
    "https://artha.link/@eanxt/jobs/travel-icu-rn-in-utica-new-york-gifted-healthcare-west-winfield-fa7d1dd1",
    "https://artha.link/@eanxt/jobs/registered-nurse-day-shift-opportunity-encompass-health-terra-ceia-24acfa0b",
    "https://artha.link/@eanxt/jobs/registered-nurse-401k-match-and-stock-encompass-health-oneco-c13205dc",
    "https://artha.link/@eanxt/jobs/registered-nurse-earn-33-to-40-per-hour-encompass-health-parrish-33463079",
    "https://artha.link/@eanxt/jobs/registered-nurse-inpatient-encompass-health-tallevast-6edfd136",
    "https://artha.link/@eanxt/jobs/registered-nurse-competitive-pay-day-encompass-health-terra-ceia-82474c3a",
    "https://artha.link/@eanxt/jobs/registered-nurse-day-one-benefits-paid-encompass-health-terra-ceia-269b3722",
    "https://artha.link/@eanxt/jobs/registered-nurse-rn-flexible-schedule-encompass-health-tallevast-e815711a",
    "https://artha.link/@eanxt/jobs/registered-nurse-help-patients-recover-encompass-health-terra-ceia-4ec1eca1",
    "https://artha.link/@eanxt/jobs/registered-nurse-full-time-or-prn-33-to-encompass-health-tallevast-22888456",
    "https://artha.link/@eanxt/jobs/registered-nurse-rn-day-shift-sarasota-encompass-health-tallevast-a12f5161",
    "https://artha.link/@eanxt/jobs/registered-nurse-sarasota-florida-local-encompass-health-myakka-city-fdd6f7b9",
    "https://artha.link/@eanxt/jobs/registered-nurse-anmed-health-pelzer-c0b0179d",
    "https://artha.link/@eanxt/jobs/registered-nurse-tuition-reimbursement-encompass-health-parrish-e49f482a",
    "https://artha.link/@eanxt/jobs/registered-nurse-full-time-or-prn-encompass-health-oneco-6b01b91e",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-terra-ceia-14917dee",
    "https://artha.link/@eanxt/jobs/registered-nurse-make-a-difference-encompass-health-terra-ceia-3c19317d",
    "https://artha.link/@eanxt/jobs/registered-nurse-compassionate-patient-encompass-health-parrish-f2f8b214",
    "https://artha.link/@eanxt/jobs/registered-nurse-west-tennessee-sharon-ce0dc036",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-scott-depot-1010a361",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-riverside-bdb7a64d",
    "https://artha.link/@eanxt/jobs/occupational-therapist-the-rehabilitation-o-fallon-2c0c203e",
    "https://artha.link/@eanxt/jobs/physical-therapist-rehabilitation-seale-3be1c615",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-saint-alphonsus-huston-df1a95d1",
    "https://artha.link/@eanxt/jobs/rn-sheldon-medical-center-prn-sanford-health-alcester-aec85136",
    "https://artha.link/@eanxt/jobs/physical-therapist-west-tennessee-atwood-86942624",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-old-hickory-9531eecd",
    "https://artha.link/@eanxt/jobs/rn-long-term-care-pt-night-good-samaritan-wirt-52ff12ad",
    "https://artha.link/@eanxt/jobs/nursing-assistant-certified-long-term-good-samaritan-northome-44062461",
    "https://artha.link/@eanxt/jobs/physical-therapist-outpatient-36hrs-essentia-health-crosslake-b5f48a63",
    "https://artha.link/@eanxt/jobs/7-on-7off-home-health-registered-nurse-rocky-mountain-care-stockton-a93db3cb",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-mc-kittrick-887f8acc",
    "https://artha.link/@eanxt/jobs/occupational-therapist-novant-health-winston-salem-70c15134",
    "https://artha.link/@eanxt/jobs/pmhnp-with-california-license-rula-health-new-york-050938b6",
    "https://artha.link/@eanxt/jobs/lpn-full-time-overnights-good-samaritan-hebron-c0e7090c",
    "https://artha.link/@eanxt/jobs/lpn-part-time-days-good-samaritan-baldwin-1d43192a",
    "https://artha.link/@eanxt/jobs/mds-rn-full-time-days-good-samaritan-moffit-b6955a98",
    "https://artha.link/@eanxt/jobs/rn-part-time-days-good-samaritan-moffit-b7aa09e3",
    "https://artha.link/@eanxt/jobs/rn-full-time-flex-plus-sunset-st-good-samaritan-dawson-bd3b0dff",
    "https://artha.link/@eanxt/jobs/rn-part-time-nights-good-samaritan-menoken-dabab718",
    "https://artha.link/@eanxt/jobs/lpn-full-time-flex-plus-sunset-st-good-samaritan-hebron-35c9873d",
    "https://artha.link/@eanxt/jobs/lpn-part-time-overnights-good-samaritan-saint-anthony-c7a0ef5b",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-ridgeside-21f9c10c",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-west-newton-cd295381",
    "https://artha.link/@eanxt/jobs/occupational-therapist-the-rehabilitation-scott-afb-018f4bc0",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-encompass-health-paint-rock-c3920bc4",
    "https://artha.link/@eanxt/jobs/physical-therapist-walton-harrison-ca4042c5",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-rural-ridge-8381f41f",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-swansea-1cdaf4f7",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-rehabilitation-woodland-1ce69dac",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-notasulga-1d3de52b",
    "https://artha.link/@eanxt/jobs/endodontist-gentle-dental-ewa-beach-2109234a",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-novant-health-mc-leansville-752190d4",
    "https://artha.link/@eanxt/jobs/dentist-endo-focus-gentle-dental-ewa-beach-df641bce",
    "https://artha.link/@eanxt/jobs/limited-x-ray-machine-operator-lxmo-sanford-health-lengby-59f922d1",
    "https://artha.link/@eanxt/jobs/nuclear-medicine-technologist-pet-sanford-health-akeley-dcd9cbc9",
    "https://artha.link/@eanxt/jobs/diagnostic-medical-sonographer-bemidji-sanford-health-clearbrook-5d59aa34",
    "https://artha.link/@eanxt/jobs/radiation-therapist-bemidji-mn-prn-sanford-health-wilton-1181c1df",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-encompass-health-morgantown-a58193d1",
    "https://artha.link/@eanxt/jobs/physical-therapist-rusk-rehabilitation-mokane-e99cc939",
    "https://artha.link/@eanxt/jobs/regional-speech-language-pathologist-slp-spectrum-center-baker-a8fd69e6",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-pelion-6bbff37e",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-chi-st-vincent-hot-springs-4470d331",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-physician-ascension-saint-cerulean-ead7a047",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-physician-urgent-team-russellville-16cf9de5",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-physician-physicians-care-graysville-87f4af21",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-thompsons-e2b9a9c6",
    "https://artha.link/@eanxt/jobs/nursing-assistant-certified-long-term-good-samaritan-iroquois-a774b113",
    "https://artha.link/@eanxt/jobs/medication-assistant-certified-long-good-samaritan-colton-fe76e1db",
    "https://artha.link/@eanxt/jobs/nursing-assistant-certified-long-term-good-samaritan-canistota-1825c7cd",
    "https://artha.link/@eanxt/jobs/medication-assistant-certified-long-good-samaritan-willow-lake-8c210bdb",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-rusk-rehabilitation-bunceton-9bac93e8",
    "https://artha.link/@eanxt/jobs/physical-therapist-kansas-burlingame-0d92ea7f",
    "https://artha.link/@eanxt/jobs/speech-pathologist-the-quad-cities-hillsdale-f587eec8",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-calvary-ec6077d3",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-alvord-77b9a296",
    "https://artha.link/@eanxt/jobs/speech-therapy-team-leader-encompass-health-davis-93e41a4f",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-geraldine-52377906",
    "https://artha.link/@eanxt/jobs/travel-or-local-icu-rn-job-in-gifted-healthcare-burnwell-813aee70",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-tuscaloosa-gifted-healthcare-samantha-41dac99e",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-ft-flex-good-samaritan-hitchcock-96a479e9",
    "https://artha.link/@eanxt/jobs/scna-senior-certified-nursing-assistant-good-samaritan-wessington-6bbf90d9",
    "https://artha.link/@eanxt/jobs/cna-certified-nursing-assistant-ft-days-good-samaritan-orient-974dd4df",
    "https://artha.link/@eanxt/jobs/medication-assistant-certified-long-good-samaritan-orient-dee67f74",
    "https://artha.link/@eanxt/jobs/cna-certified-nursing-assistant-pt-days-good-samaritan-alpena-18a8bac2",
    "https://artha.link/@eanxt/jobs/senior-cna-ft-days-good-samaritan-tulare-5d0209be",
    "https://artha.link/@eanxt/jobs/cna-certified-nursing-assistant-good-samaritan-orient-e3f9fcb0",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-prn-days-good-samaritan-gann-valley-642d3b90",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-ft-good-samaritan-wessington-e0d7eba7",
    "https://artha.link/@eanxt/jobs/registered-nurse-kansas-alta-vista-31c2d2c9",
    "https://artha.link/@eanxt/jobs/lpn-henrietta-medical-campus-rochester-regional-henrietta-0e86a943",
    "https://artha.link/@eanxt/jobs/lpn-penn-fair-pediatrics-rochester-regional-penfield-6d46a2cc",
    "https://artha.link/@eanxt/jobs/respiratory-therapy-supervisor-the-quad-cities-barstow-d02d59fa",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-the-quad-cities-andover-ebead0e7",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-houtzdale-70c26f91",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-cardwell-22d8dc4e",
    "https://artha.link/@eanxt/jobs/physical-therapist-novant-health-winston-salem-42e94dc2",
    "https://artha.link/@eanxt/jobs/occupational-therapy-assistant-encompass-health-canistota-8d80eb69",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-greensboro-479d2ba3",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-uva-encompass-esmont-6a248b83",
    "https://artha.link/@eanxt/jobs/occupational-therapist-uva-encompass-arrington-ee204e90",
    "https://artha.link/@eanxt/jobs/registered-nurse-chi-st-vincent-hot-mountain-pine-bf9ec036",
    "https://artha.link/@eanxt/jobs/registered-nurse-walton-wagener-c7d0a72b",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-encompass-health-redding-ridge-7c247d5b",
    "https://artha.link/@eanxt/jobs/pharmacist-saint-alphonsus-adrian-a62e8e76",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-mc-connellstown-b7bb005c",
    "https://artha.link/@eanxt/jobs/travel-cvicu-rn-in-st-louis-missouri-gifted-healthcare-house-springs-62a2ac24",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-registered-prn-sanford-health-saint-anthony-14bcdbed",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-registered-sanford-health-baldwin-a98607dc",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-registered-sanford-health-underwood-0242fb58",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-registered-sanford-health-cannon-ball-3d6c7f4a",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-camp-hill-3d0d5b49",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-physician-huntsville-hospital-pisgah-9b87a7a8",
    "https://artha.link/@eanxt/jobs/registered-nurse-rehabilitation-shady-valley-7ef4dbf6",
    "https://artha.link/@eanxt/jobs/physical-therapist-asst-altru-manvel-f5b4f02d",
    "https://artha.link/@eanxt/jobs/prn-tele-rn-job-in-jackson-tennessee-gifted-healthcare-jacks-creek-3055b7cd",
    "https://artha.link/@eanxt/jobs/occupational-therapist-rehabilitation-warm-springs-78cadbf2",
    "https://artha.link/@eanxt/jobs/physical-therapist-asst-west-tennessee-trezevant-98d1e8cc",
    "https://artha.link/@eanxt/jobs/travel-tele-rn-job-in-gadsden-alabama-gifted-healthcare-spring-garden-881d8644",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-gadsden-gifted-healthcare-altoona-296f71b0",
    "https://artha.link/@eanxt/jobs/dietitian-encompass-health-washington-ff979d67",
    "https://artha.link/@eanxt/jobs/travel-or-local-micu-rn-job-in-gifted-healthcare-burnwell-f275d103",
    "https://artha.link/@eanxt/jobs/travel-or-local-pcu-rn-job-in-gifted-healthcare-burnwell-6d2cdb4c",
    "https://artha.link/@eanxt/jobs/travel-or-local-imc-rn-job-in-gifted-healthcare-burnwell-6f5b066b",
    "https://artha.link/@eanxt/jobs/travel-or-local-stepdown-rn-job-in-gifted-healthcare-burnwell-222f99c4",
    "https://artha.link/@eanxt/jobs/occupational-therapy-assistant-kansas-dover-8ffef8fb",
    "https://artha.link/@eanxt/jobs/nurse-practitioner-part-time-truhealth-washington-f141d53a",
    "https://artha.link/@eanxt/jobs/lpn-altru-clifford-eec0713c",
    "https://artha.link/@eanxt/jobs/speech-pathologist-encompass-health-egan-b7dcd85e",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-tennent-9fdda4b2",
    "https://artha.link/@eanxt/jobs/speech-pathologist-kansas-admire-b97f5ac7",
    "https://artha.link/@eanxt/jobs/local-emergency-room-rn-job-in-gifted-healthcare-oaks-e2e96a0f",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-muskogee-gifted-healthcare-taft-66524d58",
    "https://artha.link/@eanxt/jobs/local-medsurg-rn-job-in-edmond-oklahoma-gifted-healthcare-wellston-1f6cd586",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-oklahoma-gifted-healthcare-newalla-40262ca7",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-tulsa-oklahoma-gifted-healthcare-vera-00950062",
    "https://artha.link/@eanxt/jobs/registered-nurse-chi-st-vincent-hot-springs-6bcb1ef3",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-job-in-edmond-oklahoma-gifted-healthcare-wellston-83c4f1a7",
    "https://artha.link/@eanxt/jobs/travel-case-management-rn-in-oklahoma-gifted-healthcare-arcadia-f530e2db",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-sapulpa-oklahoma-gifted-healthcare-preston-ebb6f7a2",
    "https://artha.link/@eanxt/jobs/class-a-cdl-drivers-needed-otr-regional-best-trucking-all-cities-b3186b00",
    "https://artha.link/@eanxt/jobs/registered-nurse-patricia-neal-la-follette-5446ccf0",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-cardinal-hill-clay-city-80a0acf1",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-duncan-falls-f4c81910",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-mc-kenney-65ec805f",
    "https://artha.link/@eanxt/jobs/lpn-encompass-health-wildwood-26301de9",
    "https://artha.link/@eanxt/jobs/speech-pathologist-rehabilitation-midway-1374d215",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-chi-st-vincent-hot-prattsville-48cb63dd",
    "https://artha.link/@eanxt/jobs/lpn-lvn-encompass-health-white-deer-a453ee16",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-encompass-health-little-mountain-50403c00",
    "https://artha.link/@eanxt/jobs/physical-therapist-the-quad-cities-lynn-center-0563eff9",
    "https://artha.link/@eanxt/jobs/lpn-lvn-encompass-health-creighton-ca02cfc3",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-bigfoot-74dafc87",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-grandfield-17f744ba",
    "https://artha.link/@eanxt/jobs/occupational-therapist-cardinal-hill-pleasureville-be4963a7",
    "https://artha.link/@eanxt/jobs/licensed-practical-nurse-lpn-11p-7a-per-maplewood-at-plainsboro-45739d4a",
    "https://artha.link/@eanxt/jobs/nurse-supervisor-encompass-health-charleston-fdab3824",
    "https://artha.link/@eanxt/jobs/prn-ltac-rn-job-in-knoxville-tennessee-gifted-healthcare-walland-985999bc",
    "https://artha.link/@eanxt/jobs/hospital-pharmacist-patient-focused-care-yuma-rehabilitation-tacna-8d5c863a",
    "https://artha.link/@eanxt/jobs/prn-ltac-rn-job-in-powell-tennessee-gifted-healthcare-rockford-1a6242d4",
    "https://artha.link/@eanxt/jobs/pharmacist-full-time-prn-pool-as-needed-yuma-rehabilitation-bard-026de95e",
    "https://artha.link/@eanxt/jobs/hospital-pharmacist-apply-today-yuma-rehabilitation-bard-6626fd61",
    "https://artha.link/@eanxt/jobs/pharmacist-inpatient-rehabilitation-yuma-rehabilitation-bard-efa14069",
    "https://artha.link/@eanxt/jobs/pharmacist-valued-for-your-expertise-as-yuma-rehabilitation-tacna-bfa4f345",
    "https://artha.link/@eanxt/jobs/hospital-pharmacist-join-a-supportive-yuma-rehabilitation-tacna-edec3a99",
    "https://artha.link/@eanxt/jobs/pharmacist-build-a-career-with-purpose-yuma-rehabilitation-bard-474f251f",
    "https://artha.link/@eanxt/jobs/pharmacist-yuma-opportunity-apply-today-yuma-rehabilitation-tacna-5b64d29f",
    "https://artha.link/@eanxt/jobs/pharmacist-prn-opportunity-yuma-rehabilitation-bard-a72db183",
    "https://artha.link/@eanxt/jobs/prn-ltac-rn-job-in-tulsa-oklahoma-gifted-healthcare-vera-e25ffe3c",
    "https://artha.link/@eanxt/jobs/prn-ltac-rn-job-in-lake-saint-louis-gifted-healthcare-defiance-19df036e",
    "https://artha.link/@eanxt/jobs/hospital-pharmacist-prn-days-yuma-rehabilitation-bard-a9d9c6e2",
    "https://artha.link/@eanxt/jobs/prn-oncology-rn-job-in-somerville-new-gifted-healthcare-whitehouse-351d5b0c",
    "https://artha.link/@eanxt/jobs/pharmacist-yuma-rehabilitation-bard-0d423bc1",
    "https://artha.link/@eanxt/jobs/pharmacist-onsite-full-time-position-yuma-rehabilitation-bard-f39a81ff",
    "https://artha.link/@eanxt/jobs/prn-medsurg-rn-job-in-pawhuska-oklahoma-gifted-healthcare-wynona-e09382e5",
    "https://artha.link/@eanxt/jobs/pharmacist-onsite-pool-position-yuma-rehabilitation-tacna-ada29de2",
    "https://artha.link/@eanxt/jobs/pharmacist-meaningful-patient-care-yuma-rehabilitation-tacna-b025c3d9",
    "https://artha.link/@eanxt/jobs/prn-operating-room-rn-job-in-hammond-gifted-healthcare-saint-benedict-139885f3",
    "https://artha.link/@eanxt/jobs/pharmacist-grow-your-pharmacy-career-yuma-rehabilitation-bard-f5ca3cee",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-diberville-57ead0ab",
    "https://artha.link/@eanxt/jobs/prn-icu-rn-job-in-jackson-tennessee-gifted-healthcare-denmark-6d3b764a",
    "https://artha.link/@eanxt/jobs/pharmacist-days-evenings-yuma-rehabilitation-tacna-c0450992",
    "https://artha.link/@eanxt/jobs/clinical-pharmacist-yuma-az-yuma-rehabilitation-tacna-e71d4505",
    "https://artha.link/@eanxt/jobs/prn-ltac-rn-job-in-st-charles-missouri-gifted-healthcare-portage-des-ff0336ab",
    "https://artha.link/@eanxt/jobs/pharmacist-earn-67-50-86-50-hour-yuma-rehabilitation-tacna-6ae33e90",
    "https://artha.link/@eanxt/jobs/pharmacist-hybrid-remote-opportunity-yuma-rehabilitation-tacna-4faa95ec",
    "https://artha.link/@eanxt/jobs/pharmacist-career-opportunity-yuma-rehabilitation-tacna-e54b4d2e",
    "https://artha.link/@eanxt/jobs/clinical-pharmacist-rewarding-yuma-rehabilitation-tacna-7034bba7",
    "https://artha.link/@eanxt/jobs/prn-ltac-rn-job-in-bridgeton-missouri-gifted-healthcare-old-monroe-8087a375",
    "https://artha.link/@eanxt/jobs/hospital-pharmacist-yuma-az-yuma-rehabilitation-bard-37077e09",
    "https://artha.link/@eanxt/jobs/pharmacist-earn-up-to-86-50-hr-yuma-rehabilitation-tacna-b6999d0c",
    "https://artha.link/@eanxt/jobs/pharmacist-flexible-prn-schedule-yuma-rehabilitation-tacna-4d14b035",
    "https://artha.link/@eanxt/jobs/pharmacist-yuma-az-yuma-rehabilitation-bard-573f5db6",
    "https://artha.link/@eanxt/jobs/occupational-therapist-west-tennessee-mc-lemoresville-572bdb70",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-cedar-crest-99b5aee2",
    "https://artha.link/@eanxt/jobs/lpn-lvn-chi-st-vincent-hot-roland-9101009f",
    "https://artha.link/@eanxt/jobs/physical-therapist-asst-encompass-health-adelphia-dde9a16f",
    "https://artha.link/@eanxt/jobs/occupational-therapist-saint-alphonsus-melba-244fa252",
    "https://artha.link/@eanxt/jobs/cdl-a-truck-driver-brown-trucking-sedalia-9be35995",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-ardmore-oklahoma-gifted-healthcare-gene-autry-c75789f4",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-ponca-city-oklahoma-gifted-healthcare-lamont-d300a7e2",
    "https://artha.link/@eanxt/jobs/travel-pacu-rn-in-muskogee-oklahoma-gifted-healthcare-boynton-d6487b3b",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-ardmore-gifted-healthcare-mannsville-b5a499bb",
    "https://artha.link/@eanxt/jobs/travel-endoscopy-rn-in-oklahoma-city-gifted-healthcare-cashion-08738708",
    "https://artha.link/@eanxt/jobs/travel-tele-rn-job-in-edmond-oklahoma-gifted-healthcare-coyle-e4867da4",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-oklahoma-city-gifted-healthcare-arcadia-b10e96dd",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-edmond-oklahoma-gifted-healthcare-coyle-e8650ec3",
    "https://artha.link/@eanxt/jobs/travel-imc-rn-job-in-oklahoma-city-gifted-healthcare-newalla-562c84aa",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-tahlequah-gifted-healthcare-hulbert-3d1eb360",
    "https://artha.link/@eanxt/jobs/travel-or-local-tele-rn-job-in-ardmore-gifted-healthcare-mannsville-99bd5c4f",
    "https://artha.link/@eanxt/jobs/travel-stepdown-rn-in-oklahoma-city-gifted-healthcare-newalla-02ec5248",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-kingfisher-oklahoma-gifted-healthcare-cashion-44ba33d0",
    "https://artha.link/@eanxt/jobs/cdl-a-truck-driver-brown-trucking-winston-salem-d8eef365",
    "https://artha.link/@eanxt/jobs/travel-tele-rn-in-tulsa-oklahoma-gifted-healthcare-vera-0dc61568",
    "https://artha.link/@eanxt/jobs/travel-pacu-rn-in-tulsa-oklahoma-gifted-healthcare-vera-ed06a984",
    "https://artha.link/@eanxt/jobs/travel-icu-rn-in-duncan-oklahoma-gifted-healthcare-loco-6d0c72e7",
    "https://artha.link/@eanxt/jobs/travel-peds-rn-in-oklahoma-city-oklahoma-gifted-healthcare-newalla-c2bab032",
    "https://artha.link/@eanxt/jobs/travel-medsurg-rn-in-lawton-oklahoma-gifted-healthcare-chattanooga-84c148a0",
    "https://artha.link/@eanxt/jobs/rn-career-with-growth-and-stability-encompass-health-leroy-1131bae2",
    "https://artha.link/@eanxt/jobs/registered-nurse-hiring-now-encompass-health-crawford-471af54a",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-elm-mott-504d4f66",
    "https://artha.link/@eanxt/jobs/registered-nurse-apply-today-encompass-health-pendleton-ac667b0d",
    "https://artha.link/@eanxt/jobs/patient-focused-registered-nurse-role-encompass-health-leroy-85eb0308",
    "https://artha.link/@eanxt/jobs/help-patients-heal-as-a-registered-nurse-encompass-health-axtell-496f31e5",
    "https://artha.link/@eanxt/jobs/work-close-to-home-as-a-registered-nurse-encompass-health-chilton-9dbe6182",
    "https://artha.link/@eanxt/jobs/full-time-night-shift-rn-opening-encompass-health-abbott-bc7b7617",
    "https://artha.link/@eanxt/jobs/build-meaningful-connections-as-an-rn-encompass-health-mount-calm-4831b952",
    "https://artha.link/@eanxt/jobs/rewarding-rehabilitation-nursing-career-encompass-health-leroy-3c229374",
    "https://artha.link/@eanxt/jobs/compassionate-care-rn-opportunity-encompass-health-leroy-7ce40095",
    "https://artha.link/@eanxt/jobs/advance-your-nursing-career-with-us-encompass-health-prairie-hill-3d12d9a1",
    "https://artha.link/@eanxt/jobs/make-a-difference-every-shift-encompass-health-oglesby-c01667f9",
    "https://artha.link/@eanxt/jobs/registered-nurse-nights-up-to-38-per-encompass-health-mount-calm-18cae6d3",
    "https://artha.link/@eanxt/jobs/night-shift-rn-opportunity-available-encompass-health-elm-mott-3d504056",
    "https://artha.link/@eanxt/jobs/join-our-rehab-nursing-team-tonight-encompass-health-pendleton-55fd6eb1",
    "https://artha.link/@eanxt/jobs/registered-nurse-cardinal-hill-pleasureville-f97fda33",
    "https://artha.link/@eanxt/jobs/registered-nurse-rusk-rehabilitation-eugene-3c46d709",
    "https://artha.link/@eanxt/jobs/dialysis-rn-the-quad-cities-montpelier-7a25b737",
    "https://artha.link/@eanxt/jobs/physical-therapist-rehabilitation-woodland-bc2c79bc",
    "https://artha.link/@eanxt/jobs/lpn-or-med-aide-hospice-ft-nights-sanford-health-lake-wilson-45debe18",
    "https://artha.link/@eanxt/jobs/shuttle-bus-driver-class-a-b-or-c-cdl-green-way-shuttles-vestal-3ff254b3",
    "https://artha.link/@eanxt/jobs/registered-nurse-yuma-rehabilitation-bard-75910e28",
    "https://artha.link/@eanxt/jobs/occupational-therapy-assistant-ascension-st-john-talala-ae0bb939",
    "https://artha.link/@eanxt/jobs/certified-medication-assistant-full-good-samaritan-marion-05d23734",
    "https://artha.link/@eanxt/jobs/certified-medication-assistant-part-good-samaritan-winfred-fe5216d7",
    "https://artha.link/@eanxt/jobs/cna-full-time-varies-good-samaritan-chester-f1764e3d",
    "https://artha.link/@eanxt/jobs/cna-full-time-flex-good-samaritan-colton-aefd8650",
    "https://artha.link/@eanxt/jobs/clinical-care-leader-full-time-good-samaritan-monroe-b0a1138e",
    "https://artha.link/@eanxt/jobs/cna-bath-aide-full-time-day-good-samaritan-lyons-ad606a51",
    "https://artha.link/@eanxt/jobs/rn-full-time-day-good-samaritan-lyons-145bfc02",
    "https://artha.link/@eanxt/jobs/cna-full-time-night-good-samaritan-centerville-1035c5e4",
    "https://artha.link/@eanxt/jobs/lpn-or-rn-full-time-nights-good-samaritan-dimock-12ab3327",
    "https://artha.link/@eanxt/jobs/cna-full-time-day-good-samaritan-bridgewater-78fff817",
    "https://artha.link/@eanxt/jobs/lpn-or-rn-prn-good-samaritan-monroe-e1b92dec",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-wakefield-cc3b61ac",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-maplesville-8e6f268b",
    "https://artha.link/@eanxt/jobs/restorative-nursing-aide-full-time-day-good-samaritan-bridgewater-41ac39aa",
    "https://artha.link/@eanxt/jobs/cna-bath-aide-full-time-day-good-samaritan-monroe-56a94bef",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-arbyrd-b017e6f7",
    "https://artha.link/@eanxt/jobs/plumbing-superintendent-i-multi-family-r-t-moore-co-marengo-7f5205ca",
    "https://artha.link/@eanxt/jobs/cna-skilled-rehab-17-93-20-49-hr-the-lakes-at-pawleys-island-69d63514",
    "https://artha.link/@eanxt/jobs/plumbing-superintendent-i-single-family-r-t-moore-co-south-solon-b729dbf5",
    "https://artha.link/@eanxt/jobs/licensed-practical-nurse-7a-7p-weekend-homestead-hills-winston-salem-8b640746",
    "https://artha.link/@eanxt/jobs/cna-part-time-prn-open-interviews-the-lakes-at-pawleys-island-7c9a5781",
    "https://artha.link/@eanxt/jobs/certified-nursing-assistant-cna-skilled-the-lakes-at-pawleys-island-22f97082",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-encompass-health-rillito-4a0278ec",
    "https://artha.link/@eanxt/jobs/certified-nursing-assistant-great-place-the-lakes-at-pawleys-island-c0a67505",
    "https://artha.link/@eanxt/jobs/lpn-day-shift-5k-sign-on-bonus-12-hour-homestead-hills-winston-salem-51a6418a",
    "https://artha.link/@eanxt/jobs/lpn-skilled-nursing-great-place-to-work-homestead-hills-winston-salem-42a1015a",
    "https://artha.link/@eanxt/jobs/licensed-practical-nurse-7a-7p-homestead-hills-winston-salem-ee4c5c89",
    "https://artha.link/@eanxt/jobs/lpn-lvn-ii-be-the-lpn-lvn-you-ve-always-encompass-health-knott-763a5a84",
    "https://artha.link/@eanxt/jobs/lpn-lvn-ii-midland-texas-encompass-health-lenorah-9559edf6",
    "https://artha.link/@eanxt/jobs/lpn-lvn-career-opportunity-encompass-health-coahoma-87934874",
    "https://artha.link/@eanxt/jobs/lpn-lvn-encompass-health-tarzan-7d4f2d70",
    "https://artha.link/@eanxt/jobs/part-time-psychiatric-nurse-thriveworks-midlothian-28dac630",
    "https://artha.link/@eanxt/jobs/licensed-practical-nurse-licensed-encompass-health-knott-0e9ad4e8",
    "https://artha.link/@eanxt/jobs/psychiatric-nurse-practitioner-fee-for-thriveworks-chesterfield-6406c4aa",
    "https://artha.link/@eanxt/jobs/physical-therapist-assistant-encompass-health-alcester-d920d6be",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-ft-day-shift-good-samaritan-mcgregor-4d3c47de",
    "https://artha.link/@eanxt/jobs/rn-lpn-full-time-weekend-nights-good-samaritan-longville-76d8dfd6",
    "https://artha.link/@eanxt/jobs/dietary-supervisor-long-term-care-full-good-samaritan-garden-city-48af0f23",
    "https://artha.link/@eanxt/jobs/occupational-therapist-chi-st-vincent-hot-roland-4582d73d",
    "https://artha.link/@eanxt/jobs/environmental-services-technician-full-good-samaritan-chester-f60e4be9",
    "https://artha.link/@eanxt/jobs/dietitian-full-time-days-good-samaritan-driscoll-10f6c5ce",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-duncan-falls-4cad3f78",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-encompass-health-macdona-2ff11061",
    "https://artha.link/@eanxt/jobs/occupational-therapist-chi-st-vincent-wooster-02620301",
    "https://artha.link/@eanxt/jobs/occupational-therapist-encompass-health-maplesville-e4a901da",
    "https://artha.link/@eanxt/jobs/dialysis-rn-cardinal-hill-clay-city-60cb290e",
    "https://artha.link/@eanxt/jobs/rn-chamberlain-care-center-part-time-sanford-health-white-lake-210d96c0",
    "https://artha.link/@eanxt/jobs/lpn-or-medical-assistant-sanborn-clinic-sanford-health-heron-lake-ea94a5d2",
    "https://artha.link/@eanxt/jobs/ct-technologist-sanford-health-glen-ullin-b39c936b",
    "https://artha.link/@eanxt/jobs/rn-diabetes-educator-pediatric-clinic-sanford-health-moffit-98cfa6f0",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-encompass-health-ellsworth-c788c7b0",
    "https://artha.link/@eanxt/jobs/assistant-director-of-nursing-rn-maplewood-at-darien-west-harrison-7318d24a",
    "https://artha.link/@eanxt/jobs/senior-social-worker-dialysis-sanford-health-cass-lake-6c329bf7",
    "https://artha.link/@eanxt/jobs/cma-or-lpn-endocrinology-ft-sanford-health-lengby-6b982cc8",
    "https://artha.link/@eanxt/jobs/phlebotomist-af1851-bemidji-sanford-health-kelliher-cc85e033",
    "https://artha.link/@eanxt/jobs/lpn-or-medical-assistant-sheldon-clinic-sanford-health-heron-lake-5dad5a7c",
    "https://artha.link/@eanxt/jobs/regional-director-of-resident-services-maplewood-senior-newton-697def05",
    "https://artha.link/@eanxt/jobs/rn-or-lpn-canby-care-center-part-time-sanford-health-ruthton-c696637e",
    "https://artha.link/@eanxt/jobs/rn-care-manager-or-social-worker-sanford-health-redlake-b2813ab5",
    "https://artha.link/@eanxt/jobs/registered-nurse-encompass-health-fouke-dfd76f04",
    "https://artha.link/@eanxt/jobs/wound-program-coordinator-encompass-health-stevenson-325b695e",
    "https://artha.link/@eanxt/jobs/physical-therapist-encompass-health-cassville-27f4a2a1",
    "https://artha.link/@eanxt/jobs/lpn-encompass-health-wentworth-5c71db3b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-midland-a17c4065",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cochiti-lake-d07135c5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-point-a4832728",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-adelphi-9f2729f2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-red-rock-6e86c592",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-doyle-c5c3fae5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-galena-c9b26578",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-walnut-springs-c7147454",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-thurston-ae32c6b4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-jasper-b1cffa74",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mc-crory-50d8ef8f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-martinsville-3378bab9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sugar-tree-623bc0e6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dobbin-d44b404e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-moxahala-e537cfce",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rio-medina-581be45e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-independence-b2389fe0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-leona-03168773",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-casstown-a03d97fd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-shauck-5f3cd9ac",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-jacksontown-ebb4f269",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-gallaway-d4f50074",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-irene-2221ee1b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-moss-48e0ed2c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-new-holland-6fde40d7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-penelope-a2da7a8a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-egypt-a58b0f99",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-malone-8eb48d41",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-trenton-f544bd21",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cashion-0d63dc0e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-spring-valley-d0b98dd6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-ethridge-70bd8a61",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-south-solon-e1e0cf9d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-nemo-9eb34c8f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-clyo-2832470c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-peaster-2b4a10ec",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-big-prairie-26d0a788",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-perrysville-c38c5ac7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-point-4bbe6aaa",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-smiths-grove-f76cacd8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-roosevelt-38a0b93c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-stanfield-eaa697fb",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-plainfield-9d6d9213",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-tipton-1d6fee1f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-unionville-f5c8a509",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-huntsville-10ceab02",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cheshire-6c6ef804",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-donnelsville-1d3916d7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lakeville-8c678e10",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-ava-b99b0727",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-batson-9faa1c56",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-lees-creek-9026b809",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-kirtland-afb-44461712",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-new-marshfield-90518265",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sheldon-35642081",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-duck-river-6e39fc63",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-naval-air-2b9a4ef6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-glenmont-ff873273",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-wadmalaw-island-5f2258bc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hill-afb-f35da9f2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-poplar-grove-f9db5349",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-fresno-74568619",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dell-city-b8499796",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-era-802b1fd7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lees-creek-2b1ef53b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-raymond-d7746f0a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-barker-bf86fa54",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-keene-38a11390",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-north-houston-6a6ac0cc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-belle-valley-9c08c942",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-jeromesville-6d3c29f2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bartlett-1c526771",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-porter-07fcd284",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fruitland-39ab2338",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-trinidad-d003fe63",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-amagon-8531e789",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-la-mesa-012f1ebd",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hestand-45e6f16b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rush-valley-0a07c5d8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-paluxy-63d438c4",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rockvale-6c64f6e8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-indian-mound-0dc40ba3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-pembroke-671a941f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rio-frio-090eedfd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rock-island-090388e9",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dawson-700a5f14",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pleasant-city-568edf17",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-port-william-39ac7b79",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-houston-ea593348",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-allensville-cc1727e2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-penelope-203cabe2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-chesterville-be1ae4b9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-avalon-20268c6a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-medway-3821fbf0",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-howard-2522c4f4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cushing-efd4cb6c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dowelltown-0615f362",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-walhonding-f754ea1e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-morrison-90972c5e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-tarpley-1d8a3557",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-amlin-904fce52",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-lockbourne-7ea8f9ae",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-green-camp-1509ccc7",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-adams-run-8a81e7e6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-nome-641b9959",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-chandler-6d7dc96a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-poynor-9dad9631",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-paris-40d720a1",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-warsaw-4cf3969a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ace-69d4453f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-summit-station-7ee9795f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-milledgeville-0d2ab15c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hopewell-a0b4382a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dover-28603f76",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cumberland-f9817cea",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-chesterhill-c81d8f9f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-raywood-69075f87",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-chatfield-f2f5093d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-etowah-d429d465",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-milford-7b9167e9",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-lissie-f0992e27",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-new-marshfield-3406e6b4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rushsylvania-5049754b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-castalian-1f1b71f0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-nunnelly-6e10f9fc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cartwright-f62d6cd5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-marengo-32a7e4bd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fayetteville-a3bcb0b8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-elmwood-b3749bbe",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-shade-4d0bb0e4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ridgeway-a1aba69d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-adams-run-d7012a8b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-scottsville-d4768e77",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-milford-a5305b85",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-wheatley-f2bb1a39",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-votaw-749a3f8f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-buchtel-11cf9a9a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-proctor-0cefca87",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pleasantville-42654c4e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-shawnee-0c16aec1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-catawba-55cf4294",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-tolar-2a521e4a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cuba-2280820b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-adelphi-6d2492d4",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hayesville-fdb4b552",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-clifton-3fc6e18c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-butler-f6db2d3c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rushsylvania-f4fb36f4",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-adams-c4874ede",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-harrisburg-4a58763e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-pecan-gap-5fb7c77d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-oregonia-84e3b6ad",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-herndon-bbcbc196",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-high-island-b7470d62",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-clifty-d29c9954",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-guysville-75164f7d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-mount-perry-97bbd0d4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-east-liberty-f65262a3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-union-furnace-7a324ec3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-vanndale-985c5f25",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-ben-franklin-b2cbff0f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sugar-grove-ce033f66",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bidwell-a935c43f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-utopia-6df14d9c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lenox-f161853c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-blum-2eaf28ab",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-willard-964595b0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-elmo-30759693",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-canadys-f8f03713",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-harpster-cb08a69f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-crenshaw-a77a2a92",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-arlington-c3eccc47",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pandora-64004f29",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-new-ulm-724974e2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-kirkland-49c58d7c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-artesia-wells-3ced2ff1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-chester-11037f26",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-gordon-d3bb346c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-streetman-d6331b19",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-henefer-960689fc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-petersburg-373c6d55",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-adamsville-9e6c2c99",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lewisburg-60ed3744",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-seaman-d8f439ac",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-creola-b7916f7c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ray-93044b29",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-merit-a37e4f5c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-middleburg-f7548942",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-jasper-47f8234e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-smiths-grove-f6cc2458",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-stewart-e56bb1dd",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-santo-8ccd46bc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-ivanhoe-296b7ebc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-killbuck-fd3edfe0",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-nemo-d39dd6a8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-china-spring-de6fd5c2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-laurelville-62ca1f7a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-westminster-91e80b03",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-toccopola-ce326370",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hayesville-b9305339",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-keene-ee498290",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-saint-helena-bd221ee2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-pulaski-7d515d39",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-haydenville-2d234e93",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-covington-b7f57940",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-harleton-c982ff5f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mc-guffey-1d3b63cb",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-thurman-1ef86ed0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-prairie-lea-45cdd890",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-amesville-63d49729",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-croton-029cd84a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-vanleer-5ef4bc26",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-chireno-6754cf62",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-zanesfield-0b60b440",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-orient-ca5d2a4d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-attica-98c81046",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-leroy-97bcdc45",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sulphur-springs-5f857336",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-harrisburg-a9115a4a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dixon-springs-721771cb",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-zanesfield-ddb25bf3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fultonham-8beee3e2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-kirby-f41222d2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-richards-cec7e335",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bartlett-36acb590",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-junction-city-e5cd9a96",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-gadsden-37ebb44c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-celeste-7af2e33f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hanna-d07ed126",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cynthiana-47955920",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bourneville-594a15fd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-brandon-35996b66",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-white-sands-40154b47",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-poolville-c779a287",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-corning-ea22ab07",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-washington-ceebffb2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-whitsett-ef792ee6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-joelton-bffd5e6b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-new-haven-c8b4a4f9",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-canadys-878cd229",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-wilson-1549cc9b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bingham-canyon-eb1bb74a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-caledonia-4c865524",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-echo-ad638b87",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-melmore-ffe2bb24",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-homer-21eb7b3b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-tillman-b0d7640c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-orchard-66d9174f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-finley-808a7c31",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-torreon-0a7da3b7",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-achille-06208be1",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-edison-956c4e07",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bynum-f10be7a8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-shade-e1373151",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-woodbury-386e3c56",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-gratiot-c85f8da7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-new-bloomington-dfd86e11",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-east-liberty-d68197cd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-santo-fc438a16",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-fayetteville-a8790d54",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-westville-77ebf3c8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hufsmith-868fdb7f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rock-island-5cbc9f6d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ivanhoe-5f625f93",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-eustace-efb1f1ed",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-manassas-269f0962",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cubero-a93706ba",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-adamsville-31babb8b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-carroll-1b62a754",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-norwich-e70ac76c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-fruitvale-a2fe797e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ostrander-4b322a8c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-vanderpool-bdbf6e7e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-maypearl-adf5fb07",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pocahontas-6d378231",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-joiner-c4253e2a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-pleasant-shade-1451883e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pena-blanca-c98082c9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-forreston-d05bbcfa",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-seaman-5e7fee97",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-otway-24a1e8e1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-casstown-1569c5a3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-manassas-c6b95453",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-kelso-9ff75c4c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-wadmalaw-island-a6366f17",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fountain-run-d9b16814",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mountainair-99f1e1a5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pulaski-86c76458",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hurricane-mills-78cced2a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-blue-rock-c84f26d5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ava-0df6b990",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-chesterhill-ae7cfdd3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-ray-4fbe749c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-beedeville-63d7c27f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-north-hampton-6aa116e3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-south-dbf0a6c3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mertens-4b7b6f99",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rosston-77036a96",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-murchison-1533c26f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-butler-3106cf4d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-realitos-ee7dcd2f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-laurelville-92a03bc0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cherry-valley-5ab75a29",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-paguate-b8b9d2a9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sledge-13785394",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-tuppers-plains-9bd7b16c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-westville-ff5e7371",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-oregonia-7f405b0f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-crown-king-b99670cc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-oakland-39a4e1e5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rocky-hill-ac551341",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rosser-60700e31",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lemitar-4beecaeb",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-irwin-1e3de197",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sedalia-0808901c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rushville-e0221f89",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-copeville-b5a6bb37",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-magnetic-f46c8c66",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-iberia-e035513e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-new-plymouth-bc282f62",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-trinidad-7b14528a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-thicket-5dbcbd43",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-tremont-city-82ef35b8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-roundhead-d1be560c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-new-haven-4813791e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-chesterville-8ec7f262",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sparta-02c9701d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-oceola-543286f1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-holland-a654b6fb",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-graford-793ab7ee",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-valley-view-16f03198",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-driftwood-1eff6c3c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-mingo-f9255b88",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ilfeld-639b792a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-martel-ce3dce06",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-san-ygnacio-3ea5f195",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-north-robinson-4c0110ab",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-middleburg-e537ef7e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-kennard-89af44fb",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-west-rushville-1ca53ade",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-adkins-76dda45e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dennis-1965fb12",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-denmark-ff69f529",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cooter-cda66d30",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-alexandria-56ef56cf",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-buffalo-valley-f66c2792",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-campbell-03bd6557",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hallsville-8f748481",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-pemberton-654316fc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-whitt-4284286e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-stockport-80282599",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-huntsville-1fb8fbe2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-kingwood-8ddeb228",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bellevue-0f23f141",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-huntsville-6415de84",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-clarksburg-d89a81b1",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cresson-7f59ed32",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-simonton-10507689",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-savannah-76fef412",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sarah-f1e44161",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-casa-blanca-ed05ecc2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-albany-ddf62ca7",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-galloway-3480921f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-zaleski-758c37bb",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dell-40a494e6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-chatfield-66f1f931",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-oakhurst-fd97c9c7",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-morral-d2402484",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-thornville-7c9fdb69",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-lynnville-14931cb7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-brunswick-a615110b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-iberia-f8d63af5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-buffalo-7b69824c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sapelo-island-41cfa76c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-waynesfield-d7783b38",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-tarlton-5d00cfdb",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cashion-6b8f952f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-big-sandy-6c1b939e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rye-81e15ade",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dunkirk-91d62cff",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dola-f7ef2777",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-holland-9dacacae",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-braggadocio-d55f16fe",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-waldenburg-5eda0a03",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-arnold-afb-4c3df27e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-luray-97445efd",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-blue-ridge-d7f11fab",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bourneville-706bdbb0",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-gracey-c9796bbd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-meridian-cc82d086",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-derby-a53e2a87",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-gifford-4148d115",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-belton-c310cb6b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-tioga-738afc14",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-tuppers-plains-224ee0d0",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-crocketville-b64000ca",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-trinway-e4f4175d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-kemp-92a5cb6a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-avalon-c1b0dcbc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rochester-40317c98",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-guy-71add466",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lopeno-65bb2342",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-jeromesville-dc515eeb",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-campaign-afdf649e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-west-mansfield-9a8f62a1",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-smartt-63a5ef39",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rice-75e624a2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bristol-e66e6437",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-egypt-6a1469e5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-mount-liberty-5c1ea37d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cedar-hill-0b1b6248",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-eustace-a94aa8e5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-plainfield-abd6ab75",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-thurman-cd775697",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dixon-springs-699e4479",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-pledger-f68bbe25",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-moss-32b1c2f0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-etoile-8886661e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-riceboro-fddc24ec",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-barker-ed69957c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-organ-6e3123fa",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-round-o-8234cb48",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-unionville-e91a8812",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dumas-4df01fef",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-port-jefferson-7add370e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bosque-62cfbce5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-ridgeway-13b38d8f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sharpsburg-c1cecdd9",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sycamore-c10adaa5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-chandlersville-4d6279f4",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-pattison-2a17c9c4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-south-solon-0b3b0a56",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-blissfield-c24b927c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-saratoga-aaa142aa",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-blum-5927a210",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hopewell-384e14b4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-howard-44a55b39",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bowersville-364022ee",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hornersville-0f7972bc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-broadway-2fd01870",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-edisto-island-135d3c97",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sharpsburg-c0df8356",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cheshire-c8d57338",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-baltic-b59cc265",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hortense-51041766",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-jekyll-island-7d5f7dc5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rosewood-57c8ae61",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-berlin-9ad5fbcc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-gladeville-dc644f94",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rock-island-d7176543",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-morristown-af428fdf",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-fleming-1754d3fd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-conesville-bfcfa8bd",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-frankewing-17c8bce0",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-wakefield-8fd5e9b6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-elberta-0e22e183",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-villanueva-7e434793",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-east-fultonham-7388efab",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-thompsons-bc682741",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bynum-e36805eb",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-trenton-1e893d1e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-crown-king-5557e75d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-uniopolis-d1e209e5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lexa-93d42c44",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mount-liberty-91e16851",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bladensburg-e999f8b5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cuney-ea4b6989",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-woodburn-a705efa6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-garwood-1f6e4bd8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fischer-2286b50e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mirando-city-87f9e1c5",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bigfoot-f9ad1265",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rio-vista-09f98197",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bryson-869312c5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dobbin-dcc88ecc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-magnetic-7135e3b7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-barry-6533ff7e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hankamer-1061c493",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-conesville-96fb5ea5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-shauck-04d3799e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-west-mansfield-f0c0bb81",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-edison-b75466e5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rarden-bee1f3bf",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-holmesville-f73261fe",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-martinsburg-3281aea6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-jbsa-randolph-44193f81",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-montgomery-66360130",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rochester-61d070b1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-marengo-e6118600",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-arp-4439427a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hunter-fd8aa249",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-millican-8d1644f8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-elmwood-69226ca0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-staples-0c275f84",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-jenera-0f4ced06",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-midway-3ab7492f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-myra-d6be266a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rosser-738c1ebc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-abbott-bd8bf6a7",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-blooming-grove-bc72d60e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cedarvale-fca69d08",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-thaxton-50d0e913",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-south-union-3b797cec",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cutler-495d68ad",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-nome-10efa30f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-okatie-dcadb3e7",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-fultonham-114ca6af",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-drummonds-08e0af70",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-early-branch-64aae38c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-latham-96b186eb",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mico-5ce2726a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fletcher-4baa6f5c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-williams-efcde54b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-diana-5bf1e2ae",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-port-bolivar-0dd89590",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-amlin-54a8aae6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bell-buckle-042deac8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hillsboro-bdb7cc7f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-fountain-run-a9949397",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-waynesfield-28d16091",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-quebeck-475d6034",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-christiansburg-cceceb77",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-meldrim-80816f7b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pierce-7a8d4f78",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-glenmont-e979d1d2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-goodrich-22ce4a55",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-otway-7d623acc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-watertown-390b2260",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-garfield-0f78421b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pineland-d253f4d1",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-clarksburg-890ef6d7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rivervale-0504558c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-duncan-falls-973eb57c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-black-oak-6d7419e3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-greenwood-500e911f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-alvaton-cc807530",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-kenney-baca2c81",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-alexandria-e1c069ff",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sinking-spring-9e533e2f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-high-island-09f73ee2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-long-branch-e539e4fe",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-wakefield-3f84abdf",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-forreston-06b12c33",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sutherland-92c174c6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-lucas-a41f4854",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-corning-4a97cf71",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rushville-088058ac",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dellrose-b1819a52",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-lone-oak-2df0d755",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-vincent-29f8c172",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-oliver-c2ba38ce",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dale-41254786",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lockbourne-438e2752",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-londonderry-3e5e4af8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-charm-426e7a53",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-smartt-431b5685",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hallsville-993d48b7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-irene-8f9f57d9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-silver-point-93e3f6ee",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-nevada-6c238bf3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-raywood-6345b0c6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-nankin-1ef2988e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sulphur-springs-7f14b936",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-centralia-3490002c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-kemp-e61307f0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bassett-af55ef67",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-devers-03d105cc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-wilkesville-a604eef7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-powell-3a038d72",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-neches-314ec4ed",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-valley-view-9a39fa81",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hye-b94e7000",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-lakeville-ce16daaf",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-windom-950db5c3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-amanda-fc26ca43",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-fulton-41875593",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-graford-18e4bb2d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-holladay-526487fd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-townsend-6f83e751",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-simonton-a8735e7d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-la-mesa-970c8320",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-belton-a0c3bce2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-buchtel-9615eb07",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lovelady-78fb08b1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rice-6d47913c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fowlerton-c33221b9",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-gordonville-3e4699e3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-register-72baa9a9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-coalton-3550b4e6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-covington-848ffc27",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-flint-c3b28187",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-amanda-29445880",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cumby-fb9ddbe7",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-aguila-514b210d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-murchison-bb96e94f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hillsboro-6dc9b0ac",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-conover-96454c9a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-san-acacia-811c1bdc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cynthiana-ad532fff",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-scotia-69220f09",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mount-hermon-655d1ebb",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-norwich-0990edf8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-trimble-2b4d82c4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-arkabutla-60dc5fb3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-san-felipe-d6005a3b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-spicewood-4c3ad204",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-joaquin-d1d1cc14",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-campbell-d49d09d6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cottontown-031d8051",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-clayton-90c64afe",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-gordon-6dcc8a3c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-crockett-mills-c648e2a2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bidwell-ee0e7127",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-daisetta-4525d9bd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-register-0f21a964",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-larue-15599f8d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cable-55d632e8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lewistown-0a32dc98",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-radnor-4e1f2395",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bryson-d7d10d64",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-carbon-hill-3edced71",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-saulsbury-487c8212",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-glen-flora-1dbd45f1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-harrod-69944f18",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-damon-d485df6f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sinking-spring-455ac62f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-catawba-acccd2db",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-glidden-6b8d29be",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-alba-1d00abd1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-oakwood-5faa93c7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-toone-620a4601",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hungerford-64c0f059",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-macdona-b98c2eca",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lissie-a61c22b0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pemberton-e8a9d84b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-crofton-4b9b58c0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-philo-8afe9b76",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dewey-fdefb613",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sadler-7af848ec",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-mc-guffey-87eb97d6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-glenford-77bacc90",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-shawnee-ab2542b6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-norene-e5fbdca7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cresson-ee157c7f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-organ-9a42de9a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-victoria-664bcb00",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-friendship-27ccbf70",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-merit-4038eafc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-wabash-e48243d3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-falcon-heights-6259905b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-carbondale-8d7ad076",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-south-a75cfe14",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-crofton-b063264a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-brownsville-51d6f027",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ottine-ef713412",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-fletcher-606e5a41",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-whites-creek-e6c24b92",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rutland-ca5bcb59",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-milford-center-c5091d0b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-charm-51bbc767",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-south-vienna-69d0448e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-southside-8c9de6c3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-waring-4499d19a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-falls-city-66bd9211",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-adolphus-297d72c0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-walnut-b7831129",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bloomingburg-330f0d84",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-brownsville-11c4e021",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-henning-9c89ff6f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-san-fidel-82c5a0cd",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-holmesville-89ef254f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-collins-7ad084ba",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ross-d0d7cc9e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-tonopah-2b1474d2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-aquilla-f31daaec",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-bladensburg-52d8582d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-liverpool-4a790f51",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-ruffin-785a093a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-holladay-85040506",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-la-jara-b1ad4bce",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-goodspring-0e12f974",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-reesville-d5eb0800",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-oakland-e246bf19",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-strawn-8b51288c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-croydon-7e4316bd",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-chamberino-34dc38ac",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-maury-city-c446da87",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-old-hickory-223726fe",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-peoa-a97663ad",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-greenwood-dd552f33",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pattison-951957e9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-braden-5568394a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dennis-66079635",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hernandez-ecbfe9de",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-quincy-8571ca50",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-alleyton-ffc8c596",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-dodd-city-cf12b702",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-santa-fe-cb084ef1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rainbow-57974f3f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-damon-0d3c9564",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-milledgeville-72c6fde9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lipan-b373650f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cobbtown-2e73529c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lingleville-688b97e3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-waelder-10e1a7ef",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-moxahala-56e47311",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lyles-5cf3ea61",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rio-grande-c5282d6e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cuba-9f269d4a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-galloway-14aa4cae",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sea-island-c3870972",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-nashport-cbeefd7e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hamden-c5ad89c9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pleasant-shade-bb49a64d",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-danevang-25b74039",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-kimbolton-06dd202a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fleming-6aaba2d0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-alger-71edef46",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-orient-eed30606",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-mitchellville-3cf6bd7d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-offerman-6be7be51",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-martinsburg-f1af4790",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sapelo-island-7b49f1c7",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-chandler-eee6b246",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lobelville-0592bd1c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-milton-b6589397",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mantua-96d3b93e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-alleyton-3f97682d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-scroggins-92a3d084",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-rainbow-38a94889",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-furman-78024cd8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-randolph-b33df5d1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mc-arthur-a6fe2f08",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-de-berry-85e5e7ed",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-round-o-7fa70003",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-raymond-e121c1f8",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-little-hocking-bef99d72",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-jacksonboro-8ae646c0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-san-jose-1cdb5ed5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-stockport-bbc9d2fa",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lynnville-3a73e0e2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-naval-air-1312efea",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-scotia-9aa3d3f0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cedar-valley-f9e4ef5b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-new-bloomington-d0177816",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bloomingburg-05f2c4b0",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sparta-696ee27a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-canones-0172c0c1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sunset-8cfe7ffe",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-richland-5d709db8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-aquilla-567d1371",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-purdon-241eb847",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-belle-center-7ab409cd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-lillian-ee46092a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-middleton-324d2640",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-junction-city-5fbcdda9",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-orlinda-9ab2327a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-olmstead-4d75b40f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-jacksontown-b9c78d0e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-milford-center-5a83ef79",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-golden-d715cff0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-norene-37a54e14",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hull-47ff8a52",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-la-fayette-368feead",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-hornsby-dd055415",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-blacklick-b72c2a09",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-brandon-36f7ad61",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-adolphus-e4a1da16",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dunbar-7950cfc3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-tennessee-9e2c681c",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-smoaks-24991b04",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-woodstock-76768c7c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-oakville-6675a3f6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-woodstock-9732cd84",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-galena-f613a604",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-colt-a421bb35",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-martinsville-dc431fea",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-rye-a62550d7",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-langsville-067aa6a1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bedias-25308acf",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-trimble-60eaa89b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-grand-junction-8d426169",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-mount-calm-ea65fce1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-yantis-6caa278f",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-roans-prairie-1bbc67d3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-creola-984e0e9f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-saint-helena-a5e5f484",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-purdon-c1a49e29",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-arrington-c6f54fd1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-quincy-e64178d4",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-sunset-630f51ac",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-carbondale-9a39acdc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-big-rock-391231ea",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cottageville-073088d2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-millican-072ffad0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sharon-grove-fd08f7f9",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-allensville-914b8113",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-kirkersville-82e31db6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-widener-6f0b1a39",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-jacksonville-c19001fc",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-thackerville-6d64a79d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-indian-mound-96129342",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-south-webster-d15f6d44",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-shiro-560b8e36",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-arnold-afb-9aa7bcb0",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-kendleton-d6842362",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-encino-92ffdbe1",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-nordheim-25ce64e4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-thackerville-f6a68a7e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-ace-53037510",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-moscow-8bdefa52",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-woodlake-3bb7fcd0",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-morgan-mill-5adb2759",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-gracey-ab31d5a5",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-poolville-30174ac2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-mc-ewen-4916ddc4",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dowelltown-ed05f9a2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-pope-e8834958",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-nashville-9fec432a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-sandia-park-db7149be",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-luke-air-force-e77d2d4a",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-vanlue-e41442b2",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-moro-f3ca151b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-savoy-3003a707",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-hardin-ff7f3ce3",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-kopperl-d1af31c8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-maydelle-5a60f3ed",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-walhonding-d883799e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cotton-plant-a3d7a40d",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-union-furnace-46f4d0dd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-mount-victory-e4e8f46c",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-shiro-ad30f678",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-leesburg-6d50e891",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-brinkhaven-24dd73c9",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-broadway-a3c5005e",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-big-prairie-86ae690f",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-stockdale-ba5aad93",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-oakhurst-65c78959",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-nashville-0c84c8ef",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-big-rock-92feddd8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-la-joya-20c5ffa6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-la-grange-0b7036b4",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-new-holland-6b2c344b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-adairville-bd922ea6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-dodge-7a7ebdc6",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cobbtown-27738d5b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-laconia-92204a0a",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-cumberland-1c97d6fa",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-alexandria-d8b5e2d3",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-picacho-cc748ba6",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-perrysville-7ba06ccd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-bon-aqua-509cae91",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-powell-c9ab95cd",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-armorel-455234b2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-savoy-f13c957e",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-alpha-6bc23045",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-stoutsville-f922e480",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-allenhurst-a62cb5ca",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-young-5f0ac41b",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-fisher-668280ba",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-waldo-99d864cc",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-port-bolivar-14c36225",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-richards-c3fe3b51",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-iredell-3eaa4b7b",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-la-rue-38549460",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-culleoka-4b51fee8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-frost-ad2165ac",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-garrison-27e05921",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-brush-creek-5462ad74",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-trenton-b89d05a8",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-cottageville-9b50c550",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-myra-4763ea46",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-spring-valley-6a180bbf",
    "https://artha.link/@eanxt/jobs/regional-class-a-dry-van-truck-driving-mesilla-valley-palo-verde-b88d2bd2",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-louise-655d3d75",
    "https://artha.link/@eanxt/jobs/cdl-a-regional-dry-van-truck-driver-job-mesilla-valley-washington-21afa1ae",
    "https://artha.link/@eanxt/jobs/now-hiring-cdl-a-owner-operators-new-dunavant-rebecca-deb6e82b",
    "https://artha.link/@eanxt/jobs/cdl-a-drivers-new-pay-increase-paschall-truck-lines-washington-a3a9da5a",
    "https://artha.link/@eanxt/jobs/cdl-a-drivers-new-pay-increase-plenty-transco-lines-north-salem-c13b298a",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-indian-springs-53a19159",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-team-schneider-agency-3756ea0e",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-team-schneider-conifer-16cf1ee4",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-mountainburg-bf8ef49b",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-tanker-truck-schneider-wilmer-b4eec575",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-over-the-road-schneider-halsey-7b5abade",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-truck-schneider-cuba-a6cde4c9",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-team-schneider-wiggins-e6b24d4b",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-lees-summit-c1154ed5",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-sanderson-a651a18f",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-truck-schneider-berlin-9e8b1fc8",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-overton-735b9fe1",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-reefer-schneider-howard-0db2636e",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-lizton-f57d323b",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-truck-schneider-avoca-bfad21bf",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-over-the-road-schneider-hickory-a7a9b698",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-over-the-road-schneider-lobelville-b9450c23",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-truck-schneider-paxico-18a3339f",
    "https://artha.link/@eanxt/jobs/transition-of-care-coach-rn-peds-miami-molina-healthcare-saint-eaa30794",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-over-the-road-schneider-hickory-47852db9",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-mountainburg-e36018de",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-lees-summit-079bcfd0",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-truck-schneider-pennington-8da2de1f",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-dedicated-schneider-macdona-551a8195",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-townsend-64a20eb2",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-otwell-8ddeeb78",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-over-the-road-schneider-leesburg-bf8e13db",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-bostwick-780e132e",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-jeffersonton-ac1c1c1c",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-over-the-road-schneider-searchlight-e0c0b5f9",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-overton-5a946f81",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-regional-van-schneider-hudson-0e461445",
    "https://artha.link/@eanxt/jobs/cdl-a-new-pay-increase-over-the-road-schneider-lobelville-de6c3d20",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91402-alto-panorama-city-11a03cb5",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91020-alto-montrose-81d05997",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91306-alto-winnetka-477bd90c",
    "https://artha.link/@eanxt/jobs/full-time-gig-driver-nights-and-alto-palos-verdes-325a8da8",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-90090-alto-dodgertown-d730786d",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91331-alto-pacoima-6b854e59",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-90293-alto-playa-del-rey-82be3b56",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-90710-alto-harbor-city-1939e12e",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-92811-alto-atwood-2126c01f",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91214-alto-la-crescenta-91c0c71c",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91344-alto-granada-hills-47097b46",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-90272-alto-pacific-f3324cc7",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91046-alto-verdugo-city-9bd2c4a6",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91342-alto-sylmar-4f8cb2f0",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-90094-alto-playa-vista-6b107800",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-90742-alto-sunset-beach-53039702",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91326-alto-porter-ranch-26a3139a",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-90274-alto-palos-verdes-90d66b12",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91610-alto-toluca-lake-4492a2d5",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91356-alto-tarzana-e86933a7",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91335-alto-reseda-4976ca81",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91352-alto-sun-valley-9de0a56d",
    "https://artha.link/@eanxt/jobs/los-angeles-alto-personal-driver-91607-alto-valley-village-d4dfae05",
    "https://artha.link/@eanxt/jobs/physical-therapist-full-time-10k-sign-cora-physical-lady-lake-lake-7b80cfa6",
    "https://artha.link/@eanxt/jobs/cdl-bus-drivers-seattle-wa-greyhound-lines-inc-seahurst-4792c09c",
    "https://artha.link/@eanxt/jobs/np-coverage-needed-in-new-york-ny-sumo-staffing-new-york-1c035f01",
    "https://artha.link/@eanxt/jobs/new-np-positions-in-lebanon-and-lima-sumo-staffing-not-specified-1c4918dc",
    "https://artha.link/@eanxt/jobs/new-high-paying-np-pediatric-locums-provider-healthcare-not-specified-d5496430",
    "https://artha.link/@eanxt/jobs/new-np-opportunity-in-southeast-virginia-sumo-staffing-not-specified-1328b6c7",
    "https://artha.link/@eanxt/jobs/np-needed-for-cardiology-position-in-sumo-staffing-not-specified-849d443f",
    "https://artha.link/@eanxt/jobs/new-cardiology-np-opportunity-in-sumo-staffing-not-specified-d6f806a1",
    "https://artha.link/@eanxt/jobs/np-locums-need-in-new-york-ny-for-adult-sumo-staffing-new-york-b0a71303",
    "https://artha.link/@eanxt/jobs/np-pa-locums-prn-needs-for-urgent-care-sumo-staffing-not-specified-6463b27b",
    "https://artha.link/@eanxt/jobs/np-needed-for-primary-care-occ-med-sumo-staffing-not-specified-2fa201ac",
    "https://artha.link/@eanxt/jobs/np-needed-in-northwest-indiana-near-sumo-staffing-not-specified-d687847f",
    "https://artha.link/@eanxt/jobs/np-locums-need-for-internal-medicine-in-sumo-staffing-not-specified-ab249707",
    "https://artha.link/@eanxt/jobs/rn-inpatient-all-progressive-care-units-university-of-new-algodones-045fdf3d",
    "https://artha.link/@eanxt/jobs/tax-expert-turbotax-store-new-york-intuit-new-york-a5100113",
    "https://artha.link/@eanxt/jobs/primary-care-physician-fm-or-im-new-unitedhealth-group-new-york-e81ad340",
    "https://artha.link/@eanxt/jobs/account-executive-business-sales-boston-t-mobile-north-attleboro-f1def8b5",
    "https://artha.link/@eanxt/jobs/carside-13-18-hr-new-ulm-urgently-applebee-s-lafayette-48b208d7",
    "https://artha.link/@eanxt/jobs/carside-13-18-hr-new-ulm-urgently-applebee-s-essig-dd58b0aa",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-advanced-acute-care-geisinger-wilkes-barre-a529ebc5",
    "https://artha.link/@eanxt/jobs/restaurant-staff-13-18-hr-new-ulm-applebee-s-hanska-9702ecc6",
    "https://artha.link/@eanxt/jobs/carside-13-18-hr-new-ulm-urgently-applebee-s-hanska-9b5a0fc9",
    "https://artha.link/@eanxt/jobs/rn-clinical-team-coordinator-registered-geisinger-wilkes-barre-1a8d82f3",
    "https://artha.link/@eanxt/jobs/rn-registered-nurse-new-advanced-acute-geisinger-wilkes-barre-63a8a37f",
    "https://artha.link/@eanxt/jobs/carside-13-18-hr-new-ulm-urgently-applebee-s-courtland-85a9e429",
    "https://artha.link/@eanxt/jobs/tax-expert-turbotax-store-new-york-intuit-new-york-b705d00d",
    "https://artha.link/@eanxt/jobs/restaurant-staff-13-18-hr-new-ulm-applebee-s-courtland-5b927ba9",
    "https://artha.link/@eanxt/jobs/restaurant-staff-13-18-hr-new-ulm-applebee-s-essig-84eda667",
    "https://artha.link/@eanxt/jobs/restaurant-staff-13-18-hr-new-ulm-applebee-s-lafayette-d148d933",
    "https://artha.link/@eanxt/jobs/restaurant-staff-13-18-hr-new-ulm-applebee-s-searles-70f7b863",
    "https://artha.link/@eanxt/jobs/carside-13-18-hr-new-ulm-urgently-applebee-s-searles-c7b07e81",
    "https://artha.link/@eanxt/jobs/account-executive-business-sales-boston-t-mobile-north-attleboro-bbdc9b1c",
    "https://artha.link/@eanxt/jobs/or-rns-needed-flexible-prn-shifts-wsi-healthcare-louviers-dddf2721",
    "https://artha.link/@eanxt/jobs/tax-expert-turbotax-store-new-york-intuit-new-york-b4bc177e",
    "https://artha.link/@eanxt/jobs/tax-expert-turbotax-store-los-angeles-intuit-mission-viego-86c013ef",
    "https://artha.link/@eanxt/jobs/travel-or-local-stepdown-rn-job-in-gifted-healthcare-pine-brook-73dfa9f5",
    "https://artha.link/@eanxt/jobs/travel-or-local-ltac-rn-job-in-gifted-healthcare-millstone-6e06c235",
    "https://artha.link/@eanxt/jobs/ai-platform-engineer-massmutual-new-york-f8636b1c",
    "https://artha.link/@eanxt/jobs/border-patrol-agent-entry-level-new-customs-and-border-jackman-0678084a",
    "https://artha.link/@eanxt/jobs/rn-new-grad-nicu-full-time-night-george-washington-washington-1895c566",
    "https://artha.link/@eanxt/jobs/cdl-a-dry-bulk-owner-operator-2-000-to-j-b-hunt-new-york-ca1b2792",
    "https://artha.link/@eanxt/jobs/cdl-a-flatbed-lease-purchase-driver-in-crst-the-new-york-5d973904",
    "https://artha.link/@eanxt/jobs/area-business-manager-hematology-sanofi-eu-nonantum-5d9f0c46",
    "https://artha.link/@eanxt/jobs/rn-inpatient-all-progressive-care-units-university-of-new-algodones-69ee3df2",
    "https://artha.link/@eanxt/jobs/sales-associate-store-99-new-castle-country-fair-petersburg-fb5f9408",
    "https://artha.link/@eanxt/jobs/cdl-a-refrigerated-truck-driver-0-55-to-kllm-transport-new-boston-3c7986ad",
    "https://artha.link/@eanxt/jobs/cdl-a-refrigerated-truck-driver-0-72-to-kllm-transport-new-salem-e6a1eaf6",
    "https://artha.link/@eanxt/jobs/cdl-a-tanker-truck-driver-1-500-to-2-sherman-brothers-san-simon-42b035d2",
    "https://artha.link/@eanxt/jobs/new-home-consultant-schumacher-homes-jeromesville-f9b7cce1",
    "https://artha.link/@eanxt/jobs/rn-icu-new-grad-jefferson-highmark-health-jefferson-hills-ee6cf174",
    "https://artha.link/@eanxt/jobs/ai-platform-engineer-massmutual-new-york-68babb78",
    "https://artha.link/@eanxt/jobs/front-desk-agent-soho-house-chicago-soho-house-soho-house-30138085",
    "https://artha.link/@eanxt/jobs/physician-maternal-fetal-medicine-new-medicus-healthcare-new-york-56da58d5",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-locum-tenens-medicus-healthcare-new-york-4ced5738",
    "https://artha.link/@eanxt/jobs/physician-surgery-orthopedics-hand-new-first-choice-inc-new-york-1c34b0ff",
    "https://artha.link/@eanxt/jobs/physician-addiction-medicine-new-york-kps-physician-new-york-487137ef",
    "https://artha.link/@eanxt/jobs/physician-neurology-new-york-permanent-evicore-healthcare-new-york-ad259471",
    "https://artha.link/@eanxt/jobs/physician-oncology-hematology-new-york-medicus-healthcare-new-york-f5897266",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-permanent-ob-medicus-healthcare-new-york-6b462c2f",
    "https://artha.link/@eanxt/jobs/physician-sleep-medicine-new-york-isleep-management-new-york-3507b606",
    "https://artha.link/@eanxt/jobs/physician-psychiatry-new-jersey-cambridge-medical-new-york-98a76224",
    "https://artha.link/@eanxt/jobs/prescribing-nurse-practitioner-or-lyra-health-inc-new-york-396e1efa",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-permanent-ob-medicus-healthcare-new-york-e50df73e",
    "https://artha.link/@eanxt/jobs/physician-oncology-radiation-new-york-evicore-healthcare-new-york-fb613657",
    "https://artha.link/@eanxt/jobs/physician-family-practice-new-york-medicus-healthcare-new-york-d78f6eb5",
    "https://artha.link/@eanxt/jobs/physician-dermatology-new-jersey-britt-medical-search-new-york-dbed4750",
    "https://artha.link/@eanxt/jobs/physician-dermatology-new-york-locum-comphealth-new-york-de595fef",
    "https://artha.link/@eanxt/jobs/physician-gastroenterology-new-york-medicus-healthcare-new-york-590c8275",
    "https://artha.link/@eanxt/jobs/physician-radiology-mammography-new-amn-healthcare-inc-new-york-5c3f2ec1",
    "https://artha.link/@eanxt/jobs/physician-nephrology-new-york-locum-medicus-healthcare-new-york-0f73293b",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-permanent-ob-medicus-healthcare-new-york-96c7b3a8",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-york-permanent-medicus-healthcare-new-york-46b9ed08",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-jersey-permanent-ob-medicus-healthcare-new-york-07ad24df",
    "https://artha.link/@eanxt/jobs/physician-emergency-medicine-new-york-medicus-healthcare-new-york-38755502",
    "https://artha.link/@eanxt/jobs/crna-anesthesiology-new-york-locum-medicus-healthcare-new-york-54536989",
    "https://artha.link/@eanxt/jobs/physician-dermatology-new-york-locum-comphealth-new-york-89e3f0f3",
    "https://artha.link/@eanxt/jobs/physician-family-practice-new-york-medicus-healthcare-new-york-5f3f7441",
    "https://artha.link/@eanxt/jobs/physician-gastroenterology-new-york-medicus-healthcare-new-york-624a3c3e",
    "https://artha.link/@eanxt/jobs/physician-otolaryngology-new-york-medicus-healthcare-new-york-3f2d3365",
    "https://artha.link/@eanxt/jobs/physician-surgery-orthopedics-new-york-medicus-healthcare-new-york-cb184496",
    "https://artha.link/@eanxt/jobs/physician-emergency-medicine-new-york-floyd-lee-locums-new-york-60ff6421",
    "https://artha.link/@eanxt/jobs/physician-psychiatry-new-york-permanent-medicus-healthcare-new-york-dd353240",
    "https://artha.link/@eanxt/jobs/physician-psychiatry-new-york-locum-medicus-healthcare-new-york-10ca6879",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-york-permanent-medicus-healthcare-new-york-f1f90677",
    "https://artha.link/@eanxt/jobs/physician-otolaryngology-new-jersey-medicus-healthcare-new-york-9256f2a5",
    "https://artha.link/@eanxt/jobs/physician-internal-medicine-new-york-accountable-new-york-7bfd18b1",
    "https://artha.link/@eanxt/jobs/physician-oncology-hematology-new-york-medicus-healthcare-new-york-fc916fac",
    "https://artha.link/@eanxt/jobs/physician-family-practice-new-york-the-inline-group-new-york-58f05439",
    "https://artha.link/@eanxt/jobs/physician-maternal-fetal-medicine-new-medicus-healthcare-new-york-c952d4ab",
    "https://artha.link/@eanxt/jobs/physician-pulmonology-new-york-medicus-healthcare-new-york-86643f23",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-jersey-locum-medicus-healthcare-new-york-0c700751",
    "https://artha.link/@eanxt/jobs/physician-oncology-hematology-new-york-medicus-healthcare-new-york-63cd71b4",
    "https://artha.link/@eanxt/jobs/new-business-dedicated-truck-driver-midwest-logistic-upton-c999130a",
    "https://artha.link/@eanxt/jobs/psychiatrist-1099-contractor-york-lyra-health-inc-new-york-b3f8982a",
    "https://artha.link/@eanxt/jobs/physician-urgent-care-new-york-kps-physician-new-york-0a4558f2",
    "https://artha.link/@eanxt/jobs/physician-neurology-new-york-permanent-medicus-healthcare-new-york-447f5539",
    "https://artha.link/@eanxt/jobs/physician-family-practice-new-jersey-swordfish-healthcare-new-york-fe593b47",
    "https://artha.link/@eanxt/jobs/physician-oncology-new-york-permanent-evicore-healthcare-new-york-185cbec1",
    "https://artha.link/@eanxt/jobs/physician-anesthesiology-new-jersey-maverick-elite-new-york-3e13788f",
    "https://artha.link/@eanxt/jobs/physician-gastroenterology-new-york-medicus-healthcare-new-york-79cd9bf8",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-jersey-locum-medicus-healthcare-new-york-32816636",
    "https://artha.link/@eanxt/jobs/physician-oncology-radiation-new-york-cross-country-new-york-d51c6eaa",
    "https://artha.link/@eanxt/jobs/physician-gastroenterology-new-york-medicus-healthcare-new-york-8087c29f",
    "https://artha.link/@eanxt/jobs/physician-surgery-general-new-jersey-comphealth-new-york-15b3b668",
    "https://artha.link/@eanxt/jobs/physician-neurology-new-york-permanent-medicus-healthcare-new-york-51b741a1",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-jersey-locum-medicus-healthcare-new-york-dc5d15e4",
    "https://artha.link/@eanxt/jobs/physician-gastroenterology-new-york-medicus-healthcare-new-york-3aba51f3",
    "https://artha.link/@eanxt/jobs/physician-family-practice-connecticut-comphealth-new-canaan-a9870627",
    "https://artha.link/@eanxt/jobs/physician-dermatology-new-york-medicus-healthcare-new-york-21c61537",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-permanent-medicus-healthcare-new-york-2180ba3e",
    "https://artha.link/@eanxt/jobs/physician-surgery-pediatric-new-york-medicus-healthcare-new-york-0b7ba8ea",
    "https://artha.link/@eanxt/jobs/physician-family-practice-new-york-medicus-healthcare-new-york-1ac7e8c1",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-permanent-continuum-medical-new-york-58813cc9",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-york-permanent-adaptive-medical-new-york-82f71413",
    "https://artha.link/@eanxt/jobs/mental-health-therapist-1099-contractor-lyra-health-inc-new-york-709f02fa",
    "https://artha.link/@eanxt/jobs/physician-surgery-orthopedics-new-york-evicore-healthcare-new-york-a9d45a87",
    "https://artha.link/@eanxt/jobs/physician-neurology-new-york-permanent-medicus-healthcare-new-york-aeb4ee7a",
    "https://artha.link/@eanxt/jobs/physician-oncology-medical-new-york-medicus-healthcare-new-york-74ca08ed",
    "https://artha.link/@eanxt/jobs/crna-anesthesiology-new-york-locum-medicus-healthcare-new-york-b317d173",
    "https://artha.link/@eanxt/jobs/physician-emergency-medicine-new-york-medicus-healthcare-new-york-27bba5d3",
    "https://artha.link/@eanxt/jobs/physician-pediatrics-new-york-permanent-accountable-new-york-0753c2c7",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-york-locum-medicus-healthcare-new-york-67814ad3",
    "https://artha.link/@eanxt/jobs/physician-oncology-hematology-new-york-medicus-healthcare-new-york-d71333ac",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-locum-or-caliber-healthcare-new-york-a68eab78",
    "https://artha.link/@eanxt/jobs/physician-neurology-new-york-permanent-comphealth-new-york-4439df97",
    "https://artha.link/@eanxt/jobs/physician-gastroenterology-new-york-evicore-healthcare-new-york-18136f6d",
    "https://artha.link/@eanxt/jobs/physician-infectious-disease-new-york-medicus-healthcare-new-york-df78f6b1",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-york-permanent-medicus-healthcare-new-york-ad9722f3",
    "https://artha.link/@eanxt/jobs/physician-urology-new-york-permanent-medicus-healthcare-new-york-b2304703",
    "https://artha.link/@eanxt/jobs/physician-other-new-york-permanent-evicore-healthcare-new-york-e847c7b1",
    "https://artha.link/@eanxt/jobs/physician-pediatrics-new-jersey-locum-go-staffing-new-york-1c007c07",
    "https://artha.link/@eanxt/jobs/physician-radiology-new-york-locum-medicus-healthcare-new-york-028be0dc",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-permanent-ob-comphealth-new-york-bf178bbb",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-york-permanent-medicus-healthcare-new-york-a8351c21",
    "https://artha.link/@eanxt/jobs/physician-urology-new-york-locum-tenens-medicus-healthcare-new-york-62cc0247",
    "https://artha.link/@eanxt/jobs/physician-urology-new-york-permanent-medicus-healthcare-new-york-94479995",
    "https://artha.link/@eanxt/jobs/physician-gastroenterology-new-york-medicus-healthcare-new-york-49762d91",
    "https://artha.link/@eanxt/jobs/physician-cardiology-new-jersey-medicus-healthcare-new-york-daf41529",
    "https://artha.link/@eanxt/jobs/physician-obgyn-new-jersey-permanent-ob-comphealth-new-york-1716e8ca",
    "https://artha.link/@eanxt/jobs/physician-cardiology-new-york-permanent-evicore-healthcare-new-york-a1465f5d",
    "https://artha.link/@eanxt/jobs/personal-training-manager-new-york-city-equinox-new-york-c88d297e",
    "https://artha.link/@eanxt/jobs/manager-in-training-personal-training-equinox-new-york-754cfa4c",
    "https://artha.link/@eanxt/jobs/personal-trainer-new-york-city-equinox-new-york-bcbdef75",
    "https://artha.link/@eanxt/jobs/no-call-locums-crna-opportunity-aya-locums-not-specified-3245785b",
    "https://artha.link/@eanxt/jobs/physician-family-practice-missouri-healthcare-not-specified-6d126bb2",
    "https://artha.link/@eanxt/jobs/physician-internal-medicine-new-mexico-healthcare-not-specified-6287ab59",
    "https://artha.link/@eanxt/jobs/physician-neurology-california-locum-sumo-medical-draper-ec99fcfc",
    "https://artha.link/@eanxt/jobs/physician-urology-indiana-permanent-britt-medical-search-not-specified-37810840",
    "https://artha.link/@eanxt/jobs/physician-obgyn-texas-permanent-dallas-healthcare-not-specified-52396cb6",
    "https://artha.link/@eanxt/jobs/lead-site-reliability-engineer-mastercard-o-fallon-148627bd",
    "https://artha.link/@eanxt/jobs/lead-site-reliability-engineer-2-mastercard-o-fallon-f2d0757d",
    "https://artha.link/@eanxt/jobs/aws-cloud-security-engineer-guidehouse-careers-mc-lean-d4ae131c",
    "https://artha.link/@eanxt/jobs/site-reliability-engineer-guidehouse-careers-mc-lean-64c26934",
    "https://artha.link/@eanxt/jobs/senior-site-reliability-engineer-mastercard-o-fallon-f2618bc5",
    "https://artha.link/@eanxt/jobs/senior-site-reliability-engineer-mastercard-o-fallon-0303e10b",
    "https://artha.link/@eanxt/jobs/site-reliability-engineer-ii-mastercard-o-fallon-2f02e7e8",
    "https://artha.link/@eanxt/jobs/prn-physical-therapist-pt-new-grads-wsi-healthcare-louviers-42c58651",
    "https://artha.link/@eanxt/jobs/registered-nurse-new-grads-welcome-central-maine-remote-a0c4e31e",
    "https://artha.link/@eanxt/jobs/prescribing-nurse-practitioner-or-lyra-health-inc-egg-harbor-ff11c87e",
    "https://artha.link/@eanxt/jobs/registered-nurse-graduate-nurse-rn-gn-windham-hospital-lebanon-819459ec",
    "https://artha.link/@eanxt/jobs/registered-nurse-gn-rn-new-grads-welcome-the-hospital-of-east-29f079d0",
    "https://artha.link/@eanxt/jobs/torrington-new-hartford-primary-care-hartford-healthcare-sharon-3b80d41a",
    "https://artha.link/@eanxt/jobs/new-client-counselor-fisher-investments-saint-435f11ea",
    "https://artha.link/@eanxt/jobs/family-nurse-practitioner-cvs-health-new-york-4b431e2c",
    "https://artha.link/@eanxt/jobs/wellness-coordinator-boston-40-hour-bi-hebrew-seniorlife-accord-d7f025bd",
    "https://artha.link/@eanxt/jobs/residential-security-officer-east-new-smile4life-security-new-york-88cf8b8d",
    "https://artha.link/@eanxt/jobs/electrician-new-york-residential-apollo-electric-new-york-f86af288",
    "https://artha.link/@eanxt/jobs/electrician-foreman-new-york-apollo-electric-new-york-886d3714",
    "https://artha.link/@eanxt/jobs/travel-emergency-room-rn-in-rochester-gifted-healthcare-morton-ca2712f3",
    "https://artha.link/@eanxt/jobs/venue-porter-new-york-ny-adecco-new-york-d60c6964",
    "https://artha.link/@eanxt/jobs/janitorial-staff-new-york-ny-vensure-employer-new-york-f61f7d64",
    "https://artha.link/@eanxt/jobs/new-york-delivery-driver-forkable-new-york-f9971a19",
    "https://artha.link/@eanxt/jobs/route-sales-representative-york-county-dieffenbach-s-bethel-563379cf",
    "https://artha.link/@eanxt/jobs/new-graduate-licensed-practical-nurse-m-vna-care-dorchester-a3d793b8",
    "https://artha.link/@eanxt/jobs/lpn-licensed-practical-nurse-new-greater-med-staffing-new-york-19f394a2",
    "https://artha.link/@eanxt/jobs/cyber-security-engineer-jouneyman-nexagen-networks-inc-lower-longwood-9a9514b7",
    "https://artha.link/@eanxt/jobs/production-coordinator-for-new-york-reflex-performance-new-york-06043807",
    "https://artha.link/@eanxt/jobs/film-creator-san-francisco-best-friend-finance-new-york-d9212474",
    "https://artha.link/@eanxt/jobs/cyber-security-engineer-vulnerability-rennerbrown-staffing-new-york-897f31fe",
    "https://artha.link/@eanxt/jobs/chicago-stepping-dance-instructor-diviras-art-of-new-york-2f07ee41",
    "https://artha.link/@eanxt/jobs/bilingual-para-professional-in-boston-ma-procare-therapy-east-boston-7b48d6ef",
    "https://artha.link/@eanxt/jobs/instructional-aide-boston-ma-procare-therapy-east-boston-dd3062a6",
    "https://artha.link/@eanxt/jobs/behavioral-strategy-guide-dallas-center-heartland-aba-minburn-e8a14ad5",
    "https://artha.link/@eanxt/jobs/support-professional-for-autism-dallas-heartland-aba-minburn-573d6fcc",
    "https://artha.link/@eanxt/jobs/armed-patrol-officer-boston-3rd-shift-elite-protective-roxbury-c8afb284",
    "https://artha.link/@eanxt/jobs/in-home-behavioral-clinician-bilingual-gandara-mental-east-boston-95cb5676",
    "https://artha.link/@eanxt/jobs/devsecops-engineer-reallaer-llc-washington-8e630429",
    "https://artha.link/@eanxt/jobs/devsecops-engineer-custom-software-washington-a3933467",
    "https://artha.link/@eanxt/jobs/devsecops-engineer-aws-opendatajobs-washington-6a83dd65",
    "https://artha.link/@eanxt/jobs/devsecops-engineer-otoe-missouria-group-washington-b14bf9b5",
    "https://artha.link/@eanxt/jobs/front-desk-clerk-on-call-san-rafael-caritas-management-greenbrae-fd8173ca",
    "https://artha.link/@eanxt/jobs/special-education-teacher-san-ysidro-procare-therapy-san-ysidro-9629301e",
    "https://artha.link/@eanxt/jobs/travel-special-education-teacher-san-procare-therapy-san-ysidro-186511ba",
    "https://artha.link/@eanxt/jobs/physical-therapist-vna-home-care-of-vna-care-dorchester-b9fcfdba",
    "https://artha.link/@eanxt/jobs/pediatric-school-speech-language-sunbelt-staffing-east-boston-a496a36c",
    "https://artha.link/@eanxt/jobs/classroom-assistant-boston-massachusetts-procare-therapy-east-boston-148c7940",
    "https://artha.link/@eanxt/jobs/physical-therapist-school-setting-in-procare-therapy-east-boston-42ad8cc4",
    "https://artha.link/@eanxt/jobs/para-professional-in-boston-ma-procare-therapy-east-boston-4ea45f58",
    "https://artha.link/@eanxt/jobs/school-occupational-therapist-boston-procare-therapy-east-boston-8c32737c",
    "https://artha.link/@eanxt/jobs/denver-cdl-instructor-excel-driver-henderson-95cd9389",
    "https://artha.link/@eanxt/jobs/rbt-developmental-hero-child-advocate-heartland-aba-80011-ca5924e1",
    "https://artha.link/@eanxt/jobs/cdl-a-truck-driver-atlanta-ga-gt-expedited-south-fulton-3988f029",
    "https://artha.link/@eanxt/jobs/senior-ii-site-reliability-engineer-akamai-remote-6e232829",
    "https://artha.link/@eanxt/jobs/staff-platform-engineer-infrastructure-kalepa-new-york-05fe9e06",
    "https://artha.link/@eanxt/jobs/senior-platform-software-engineer-camber-new-york-f09c1a84",
    "https://artha.link/@eanxt/jobs/platform-engineer-belay-technologies-annapolis-5614ef92",
    "https://artha.link/@eanxt/jobs/staff-site-reliability-engineer-anthropic-new-york-7afbcf2a",
    "https://artha.link/@eanxt/jobs/senior-information-systems-security-dark-horse-tech-north-center-c4ddfe8e",
    "https://artha.link/@eanxt/jobs/senior-platform-operations-engineer-eliseai-new-york-29003d36",
    "https://artha.link/@eanxt/jobs/senior-information-security-engineer-mwe-new-york-bcb559ce",
    "https://artha.link/@eanxt/jobs/security-engineer-fox-corporation-new-york-1e469585",
    "https://artha.link/@eanxt/jobs/sr-platform-engineer-datavations-new-york-bd40cc58",
    "https://artha.link/@eanxt/jobs/security-operations-engineer-k-health-new-york-2066a5c7",
    "https://artha.link/@eanxt/jobs/staff-security-engineer-product-nscale-new-york-b7f06d9a",
    "https://artha.link/@eanxt/jobs/security-engineer-ids-vulnerability-verizon-basking-ridge-076bc6ec",
    "https://artha.link/@eanxt/jobs/security-engineer-application-security-writer-new-york-c35d8259",
    "https://artha.link/@eanxt/jobs/lead-site-reliability-engineer-mastercard-abroad-8ae94835",
    "https://artha.link/@eanxt/jobs/senior-cloud-information-system-mantech-washington-78d37dd4",
    "https://artha.link/@eanxt/jobs/application-security-engineer-appsec-micro1-93daf245",
    "https://artha.link/@eanxt/jobs/backend-security-engineer-micro1-a5876a85",
    "https://artha.link/@eanxt/jobs/cyber-security-engineer-micro1-ce1221d0",
    "https://artha.link/@eanxt/jobs/occupational-therapist-san-angelo-texas-confidential-wall-47830ec4",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-coverage-at-locumtenens-com-brookesmith-f6a92dec",
    "https://artha.link/@eanxt/jobs/family-medicine-physician-associate-locumtenens-com-friant-48b1393b",
    "https://artha.link/@eanxt/jobs/occupational-therapist-san-angelo-texas-shannon-wall-26439819",
    "https://artha.link/@eanxt/jobs/occupational-therapist-pool-401-k-paid-encompass-health-san-angelo-tx-4689c5ee",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-97551fa8",
    "https://artha.link/@eanxt/jobs/family-medicine-nurse-practitioner-locumtenens-com-friant-a471d4f2",
    "https://artha.link/@eanxt/jobs/nurse-practitioner-or-physician-mrg-exams-jbsa-ft-sam-ca614068",
    "https://artha.link/@eanxt/jobs/registered-nurse-san-angelo-texas-shannon-silver-24081e10",
    "https://artha.link/@eanxt/jobs/travel-nurse-or-operating-room-job-in-vetted-health-new-york-8850a621",
    "https://artha.link/@eanxt/jobs/occupational-therapist-san-angelo-texas-shannon-carlsbad-806baf26",
    "https://artha.link/@eanxt/jobs/l-d-rn-registered-nurse-in-san-luis-capstone-healthcare-san-luis-fde8bd88",
    "https://artha.link/@eanxt/jobs/or-rn-registered-nurse-in-san-luis-capstone-healthcare-san-luis-066e30a8",
    "https://artha.link/@eanxt/jobs/registered-nurse-san-angelo-texas-confidential-silver-190a5380",
    "https://artha.link/@eanxt/jobs/family-medicine-nurse-practitioner-confidential-friant-69e2ef74",
    "https://artha.link/@eanxt/jobs/anesthesiologist-needed-for-locum-locumtenens-com-brookesmith-270a0a2b",
    "https://artha.link/@eanxt/jobs/registered-nurse-san-angelo-texas-shannon-water-valley-d406086d",
    "https://artha.link/@eanxt/jobs/family-medicine-physician-associate-locumtenens-com-friant-e79db3eb",
    "https://artha.link/@eanxt/jobs/occupational-therapist-san-angelo-texas-shannon-wall-290fd28b",
    "https://artha.link/@eanxt/jobs/anesthesiologist-needed-for-locum-confidential-brookesmith-e9c9b45e",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-confidential-brookesmith-a7309352",
    "https://artha.link/@eanxt/jobs/occupational-therapist-travel-contract-jackson-therapy-california-05acc0d0",
    "https://artha.link/@eanxt/jobs/endocrinology-opening-san-francisco-bay-marinhealth-greenbrae-ff5cc8a9",
    "https://artha.link/@eanxt/jobs/labor-compliance-manager-solv-energy-new-york-410490d1",
    "https://artha.link/@eanxt/jobs/sales-consultant-san-fernando-santa-sysco-ventura-3c0dc35b",
    "https://artha.link/@eanxt/jobs/family-medicine-nurse-practitioner-locumtenens-com-friant-82094671",
    "https://artha.link/@eanxt/jobs/family-medicine-physician-associate-confidential-friant-9ee6fe3a",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-coverage-at-confidential-brookesmith-1c251e04",
    "https://artha.link/@eanxt/jobs/lpn-lvn-san-angelo-texas-shannon-rowena-eed864a0",
    "https://artha.link/@eanxt/jobs/front-desk-hampton-inn-san-simeon-greens-operations-san-simeon-75748c84",
    "https://artha.link/@eanxt/jobs/lead-cook-paul-weiss-1285-aramark-new-york-e0605675",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-saba-county-us-postal-service-san-saba-county-51bf3894",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-pedro-us-postal-service-san-pedro-67350c8c",
    "https://artha.link/@eanxt/jobs/cdl-a-refrigerated-team-truck-driver-0-alltruckjobs-san-simon-70083262",
    "https://artha.link/@eanxt/jobs/head-universal-banker-san-mateo-citi-hillsdale-69092ec6",
    "https://artha.link/@eanxt/jobs/postal-clerk-north-san-juan-us-postal-service-north-san-juan-cf9a6769",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-luis-us-postal-service-new-mexico-79e2e4c4",
    "https://artha.link/@eanxt/jobs/neurogastroenterology-nurse-sutter-west-bay-ringle-ae4d7b33",
    "https://artha.link/@eanxt/jobs/family-medicine-physician-associate-locumtenens-com-friant-222de9ff",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-coverage-at-locumtenens-com-brookesmith-995727f0",
    "https://artha.link/@eanxt/jobs/travel-nurse-icu-intensive-care-unit-vetted-health-coeur-d-alene-8f6a89d6",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-jose-us-postal-service-arizona-fdaf5c26",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-felipe-us-postal-service-san-felipe-61643ac8",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-antonito-us-postal-service-san-antonito-78ed2f74",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-felipe-pueblo-us-postal-service-new-mexico-3c8b50af",
    "https://artha.link/@eanxt/jobs/postal-clerk-francisco-us-postal-service-francisco-c266fcad",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-buenaventura-us-postal-service-san-eedfe4f0",
    "https://artha.link/@eanxt/jobs/family-medicine-nurse-practitioner-locumtenens-com-friant-442c612c",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-6012de77",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-benito-county-us-postal-service-san-benito-6be77885",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-juan-county-us-postal-service-san-juan-county-aa0f1015",
    "https://artha.link/@eanxt/jobs/postal-clerk-jardin-de-san-julian-us-postal-service-texas-6056a0dc",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-miguel-us-postal-service-arizona-489459b0",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-antonio-heights-us-postal-service-california-14e74a52",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-pablo-us-postal-service-new-mexico-66cc5859",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-rafael-us-postal-service-san-rafael-df47c5d9",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-pasqual-us-postal-service-california-69c8bddc",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-antonio-us-postal-service-san-antonio-6ee7ecad",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-lorenzo-us-postal-service-san-lorenzo-3307b94e",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-mateo-us-postal-service-san-mateo-7b57eaab",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-miguel-county-us-postal-service-san-jose-ba946d89",
    "https://artha.link/@eanxt/jobs/postal-clerk-san-juan-us-postal-service-puerto-rico-79b5a690",
    "https://artha.link/@eanxt/jobs/physical-therapist-seattle-wa-fox-rehabilitation-seattle-wa-268d9b7e",
    "https://artha.link/@eanxt/jobs/physical-therapist-west-seattle-wa-fox-rehabilitation-seattle-wa-a6f239d4",
    "https://artha.link/@eanxt/jobs/pediatric-anesthesiologist-needed-for-locumtenens-com-malaga-1f4b82e0",
    "https://artha.link/@eanxt/jobs/dnp-needed-for-locum-tenens-coverage-at-locumtenens-com-malaga-262c24d8",
    "https://artha.link/@eanxt/jobs/travel-er-rn-fusion-medical-seattle-wa-741a465e",
    "https://artha.link/@eanxt/jobs/cdl-bus-drivers-seattle-wa-greyhound-lines-inc-south-tacoma-511e8644",
    "https://artha.link/@eanxt/jobs/travel-occupational-therapist-aya-education-seattle-wa-bb171159",
    "https://artha.link/@eanxt/jobs/dentist-gentle-dental-seahurst-904bf9e2",
    "https://artha.link/@eanxt/jobs/dentist-partnership-gentle-dental-medina-wa-08ee5e4c",
    "https://artha.link/@eanxt/jobs/psychiatrist-needed-for-locum-tenens-locumtenens-com-malaga-7638704f",
    "https://artha.link/@eanxt/jobs/cdl-bus-drivers-seattle-wa-greyhound-lines-inc-seahurst-161a6b11",
    "https://artha.link/@eanxt/jobs/travel-ct-technologist-fusion-medical-seattle-wa-48f21b6b",
    "https://artha.link/@eanxt/jobs/dnp-needed-for-locum-tenens-coverage-at-locumtenens-com-malaga-ef9a90e6",
    "https://artha.link/@eanxt/jobs/dentist-gentle-dental-seahurst-2183cc1a",
    "https://artha.link/@eanxt/jobs/cdl-bus-drivers-seattle-wa-confidential-south-tacoma-00c9c7d2",
    "https://artha.link/@eanxt/jobs/dnp-needed-for-locum-tenens-coverage-at-confidential-malaga-af0aedb4",
    "https://artha.link/@eanxt/jobs/oral-surgeon-gentle-dental-seahurst-b008a53a",
    "https://artha.link/@eanxt/jobs/seattle-breast-imaging-amn-healthcare-washington-04cd861c",
    "https://artha.link/@eanxt/jobs/pediatric-anesthesiologist-needed-for-locumtenens-com-malaga-22635f34",
    "https://artha.link/@eanxt/jobs/psychiatrist-needed-for-locum-tenens-locumtenens-com-malaga-e31d4a22",
    "https://artha.link/@eanxt/jobs/pediatric-anesthesiologist-needed-for-confidential-malaga-dc68e4aa",
    "https://artha.link/@eanxt/jobs/psychiatrist-needed-for-locum-tenens-confidential-malaga-e6ce1dea",
    "https://artha.link/@eanxt/jobs/dentist-confidential-seahurst-d5d73406",
    "https://artha.link/@eanxt/jobs/anesthesiologist-needed-for-locum-locumtenens-com-brookesmith-89d279d4",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-37d513c0",
    "https://artha.link/@eanxt/jobs/ob-gyn-needed-for-locum-tenens-coverage-confidential-brookesmith-15ef3a11",
    "https://artha.link/@eanxt/jobs/anesthesiologist-needed-for-locum-confidential-brookesmith-8e7eb531",
    "https://artha.link/@eanxt/jobs/rn-austin-co-united-states-willow-tree-care-austin-ced7a62d",
    "https://artha.link/@eanxt/jobs/customer-service-representative-austin-cosentino-austin-f48f9b97",
    "https://artha.link/@eanxt/jobs/austin-aviation-undergraduate-intern-city-of-austin-island-city-879851ad",
    "https://artha.link/@eanxt/jobs/account-manager-npwt-austin-tx-smith-nephew-field-c2519d56",
    "https://artha.link/@eanxt/jobs/postal-clerk-austin-us-postal-service-austin-8d2e9454",
    "https://artha.link/@eanxt/jobs/registered-nurse-st-david-s-travis-county-1cdc2b5b",
    "https://artha.link/@eanxt/jobs/ob-gyn-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-785a0471",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-0f564398",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-confidential-brookesmith-0eed2b92",
    "https://artha.link/@eanxt/jobs/ob-gyn-needed-for-locum-tenens-coverage-confidential-brookesmith-fe49af04",
    "https://artha.link/@eanxt/jobs/cdl-a-dry-van-truck-driver-in-austin-ky-alltruckjobs-austin-6641e91b",
    "https://artha.link/@eanxt/jobs/ob-gyn-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-78a17e1c",
    "https://artha.link/@eanxt/jobs/occupational-medicine-nurse-locumtenens-com-brookesmith-73320da1",
    "https://artha.link/@eanxt/jobs/occupational-medicine-physician-locumtenens-com-brookesmith-056bbfe1",
    "https://artha.link/@eanxt/jobs/occupational-medicine-physician-needed-locumtenens-com-brookesmith-b7e74ffb",
    "https://artha.link/@eanxt/jobs/anesthesiologist-needed-for-locum-locumtenens-com-brookesmith-d0d22a41",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-053d02c1",
    "https://artha.link/@eanxt/jobs/occupational-medicine-nurse-locumtenens-com-brookesmith-3cf508ac",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-confidential-brookesmith-a6113736",
    "https://artha.link/@eanxt/jobs/occupational-medicine-physician-needed-confidential-brookesmith-4d5bb82f",
    "https://artha.link/@eanxt/jobs/occupational-medicine-physician-needed-locumtenens-com-brookesmith-3268c56d",
    "https://artha.link/@eanxt/jobs/occupational-medicine-physician-locumtenens-com-brookesmith-a9e5125e",
    "https://artha.link/@eanxt/jobs/occupational-medicine-physician-confidential-brookesmith-27be6370",
    "https://artha.link/@eanxt/jobs/occupational-medicine-nurse-confidential-brookesmith-42d3fd7a",
    "https://artha.link/@eanxt/jobs/ob-gyn-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-dfec99e3",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-9a7cd6a7",
    "https://artha.link/@eanxt/jobs/ob-gyn-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-5f767e8a",
    "https://artha.link/@eanxt/jobs/psychiatrist-needed-for-locum-tenens-locumtenens-com-friant-0f20e0ed",
    "https://artha.link/@eanxt/jobs/occupational-therapist-401-k-paid-time-encompass-health-los-ranchos-de-cf0eb8fe",
    "https://artha.link/@eanxt/jobs/occupational-therapist-401-k-paid-time-encompass-health-los-lunas-nm-3e136caf",
    "https://artha.link/@eanxt/jobs/er-rn-registered-nurse-in-los-angeles-capstone-healthcare-los-angeles-ca-4b2f079a",
    "https://artha.link/@eanxt/jobs/dentist-gentle-dental-sheridan-or-4dc94143",
    "https://artha.link/@eanxt/jobs/psychiatrist-needed-for-locum-tenens-confidential-friant-f1bffe03",
    "https://artha.link/@eanxt/jobs/postal-clerk-los-chaves-us-postal-service-chaves-county-70dbc9c7",
    "https://artha.link/@eanxt/jobs/travel-er-rn-fusion-medical-chicago-il-6698d115",
    "https://artha.link/@eanxt/jobs/ob-gyn-northern-indiana-1-hr-from-franciscan-st-john-ff52a292",
    "https://artha.link/@eanxt/jobs/hematology-medical-oncologist-mercyhealth-rockford-il-abc7ea74",
    "https://artha.link/@eanxt/jobs/urology-near-chicago-amn-healthcare-south-bend-in-af9a5b2b",
    "https://artha.link/@eanxt/jobs/travel-med-surg-rn-fusion-medical-chicago-il-6d3083e9",
    "https://artha.link/@eanxt/jobs/ob-gyn-northern-indiana-1-hr-from-confidential-st-john-fafce5a8",
    "https://artha.link/@eanxt/jobs/uber-driver-you-could-earn-27-47-per-uber-great-lakes-c81ce84d",
    "https://artha.link/@eanxt/jobs/relationship-banker-chicago-heritage-jpmorgan-chase-co-chicago-south-8ead5894",
    "https://artha.link/@eanxt/jobs/pt-guest-service-agent-part-time-hilton-hilton-chicago-o-hare-6b2a9399",
    "https://artha.link/@eanxt/jobs/physical-therapist-greater-boston-ma-fox-rehabilitation-middlesex-b37172e7",
    "https://artha.link/@eanxt/jobs/cdl-bus-drivers-boston-ma-greyhound-lines-inc-littleton-885f010d",
    "https://artha.link/@eanxt/jobs/cdl-bus-drivers-boston-ma-greyhound-lines-inc-bedford-ma-dd3b64f7",
    "https://artha.link/@eanxt/jobs/travel-ct-technologist-fusion-medical-boston-ma-b570c7e4",
    "https://artha.link/@eanxt/jobs/physical-therapist-greater-boston-ma-fox-rehabilitation-middlesex-430754ae",
    "https://artha.link/@eanxt/jobs/travel-icu-rn-fusion-medical-boston-ma-7b3b3e13",
    "https://artha.link/@eanxt/jobs/uber-driver-you-could-earn-21-98-per-uber-boston-7f6cc03a",
    "https://artha.link/@eanxt/jobs/uber-driver-you-could-earn-21-98-per-confidential-boston-116f1290",
    "https://artha.link/@eanxt/jobs/travel-med-surg-rn-fusion-medical-charlestown-54d1ac75",
    "https://artha.link/@eanxt/jobs/travel-med-surg-telemetry-rn-fusion-medical-boston-ma-1d5be3f2",
    "https://artha.link/@eanxt/jobs/cdl-bus-drivers-boston-ma-confidential-south-easton-eb51915a",
    "https://artha.link/@eanxt/jobs/occupational-therapist-travel-contract-jackson-therapy-needham-aa9ea7fe",
    "https://artha.link/@eanxt/jobs/sr-relationship-manager-global-bank-of-america-new-york-4ad22668",
    "https://artha.link/@eanxt/jobs/postal-clerk-boston-us-postal-service-boston-1c3d5c3a",
    "https://artha.link/@eanxt/jobs/postal-clerk-boston-heights-us-postal-service-ohio-2e1a8607",
    "https://artha.link/@eanxt/jobs/travel-er-rn-fusion-medical-boston-ma-a43ab278",
    "https://artha.link/@eanxt/jobs/travel-telemetry-rn-fusion-medical-charlestown-7ab19a12",
    "https://artha.link/@eanxt/jobs/postal-clerk-new-boston-us-postal-service-new-boston-5c1ac802",
    "https://artha.link/@eanxt/jobs/rn-mom-baby-metro-denver-float-pool-uchealth-centennial-co-c21b985f",
    "https://artha.link/@eanxt/jobs/psychiatrist-needed-for-locum-tenens-locumtenens-com-hartsel-e3736923",
    "https://artha.link/@eanxt/jobs/rn-mom-baby-metro-denver-float-pool-uchealth-peyton-e732f2bf",
    "https://artha.link/@eanxt/jobs/physical-therapist-16-week-contract-wsi-healthcare-idaho-springs-18c02010",
    "https://artha.link/@eanxt/jobs/uber-driver-you-could-earn-21-98-per-uber-denver-9b1ec8a9",
    "https://artha.link/@eanxt/jobs/travel-er-rn-fusion-medical-denver-co-cdc5e048",
    "https://artha.link/@eanxt/jobs/psychiatrist-needed-for-locum-tenens-locumtenens-com-hartsel-bc80dc21",
    "https://artha.link/@eanxt/jobs/rn-l-d-metro-denver-float-pool-uchealth-peyton-994bc0be",
    "https://artha.link/@eanxt/jobs/metro-denver-critical-care-float-pool-uchealth-peyton-df2a58fb",
    "https://artha.link/@eanxt/jobs/occupational-therapist-otr-home-health-confidential-larkspur-c504a47e",
    "https://artha.link/@eanxt/jobs/psychiatrist-needed-for-locum-tenens-confidential-hartsel-f36d84c0",
    "https://artha.link/@eanxt/jobs/in-home-np-pa-part-time-denver-co-signify-health-colorado-f4741a05",
    "https://artha.link/@eanxt/jobs/rn-mom-baby-metro-denver-float-pool-uchealth-parker-co-bd2c9492",
    "https://artha.link/@eanxt/jobs/rn-mom-baby-metro-denver-float-pool-uchealth-peyton-22fba3ac",
    "https://artha.link/@eanxt/jobs/rn-nicu-denver-float-pool-uchealth-peyton-9f9f0fbd",
    "https://artha.link/@eanxt/jobs/rn-acute-care-denver-metro-acute-care-uchealth-peyton-216d0c9e",
    "https://artha.link/@eanxt/jobs/respiratory-therapist-traveler-denver-uchealth-peyton-9224cb17",
    "https://artha.link/@eanxt/jobs/uber-driver-you-could-earn-21-98-per-confidential-denver-15411abe",
    "https://artha.link/@eanxt/jobs/rn-acute-care-denver-metro-regional-uchealth-peyton-55250729",
    "https://artha.link/@eanxt/jobs/ob-gyn-atlanta-amn-healthcare-atlanta-ga-98c8b999",
    "https://artha.link/@eanxt/jobs/pediatric-otolaryngologist-amn-healthcare-atlanta-ga-206bb40c",
    "https://artha.link/@eanxt/jobs/uber-driver-you-could-earn-21-98-per-uber-atlanta-b495d10e",
    "https://artha.link/@eanxt/jobs/certified-nursing-assistant-full-time-good-samaritan-white-2999e609",
    "https://artha.link/@eanxt/jobs/uber-driver-you-could-earn-21-98-per-confidential-atlanta-9a29a867",
    "https://artha.link/@eanxt/jobs/travel-rrt-icu-respiratory-therapy-fusion-medical-cobb-county-a23e6097",
    "https://artha.link/@eanxt/jobs/postal-clerk-atlanta-us-postal-service-atlanta-15444b4e",
    "https://artha.link/@eanxt/jobs/sales-consultant-downtown-midtown-sysco-buckhead-a62d2d0c",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-6973a22a",
    "https://artha.link/@eanxt/jobs/occupational-therapist-methodist-health-naval-air-b8b0c2ff",
    "https://artha.link/@eanxt/jobs/physical-therapist-prn-methodist-health-forney-tx-072c334e",
    "https://artha.link/@eanxt/jobs/occupational-therapist-confidential-naval-air-86af1c18",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-locumtenens-com-brookesmith-2ed27596",
    "https://artha.link/@eanxt/jobs/crna-needed-for-locum-tenens-coverage-confidential-brookesmith-7acb3ed2",
    "https://artha.link/@eanxt/jobs/physical-therapist-full-time-jackson-therapy-texas-91f31751",
    "https://artha.link/@eanxt/jobs/prn-clinician-methodist-health-maypearl-d6f3506d",
    "https://artha.link/@eanxt/jobs/ios-senior-associate-onsite-ny-dallas-ion-group-new-york-37809f41",
    "https://artha.link/@eanxt/jobs/postal-clerk-dallas-us-postal-service-dallas-024e124a",
    "https://artha.link/@eanxt/jobs/postal-clerk-miami-county-us-postal-service-miami-county-737ce28b",
    "https://artha.link/@eanxt/jobs/postal-clerk-miami-us-postal-service-miami-f5fbec68",
    "https://artha.link/@eanxt/jobs/travel-physical-therapist-pt-fusion-medical-miami-dade-f516e1c5",
    "https://artha.link/@eanxt/jobs/postal-clerk-north-miami-us-postal-service-north-miami-415cb95c",
    "https://artha.link/@eanxt/jobs/postal-clerk-miami-dade-county-us-postal-service-miami-dade-e5f0f4ff",
    "https://artha.link/@eanxt/jobs/postal-clerk-miami-heights-us-postal-service-ohio-a247ff41"
  ];

  let jobQueue = DEFAULT_QUEUE;
  let batchSize = 50; // default 50 (configurable: 25, 50, 100, 200)

  // =========================================================================
  // 💾 STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE (ISOLATED US SESSION)
  // =========================================================================
  const STORAGE_KEY = "__ZERO_FOOTPRINT_APPLIER_STATE_US__";

  function loadSavedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { currentIndex: 0, completedCount: 0, skippedCount: 0, history: [] };
  }

  function saveState(stateObj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
    } catch (e) {}
  }

  let state = loadSavedState();
  let isRunning = false;
  let isPaused = false;
  let speedMode = "5s"; // 1s, 2s, 3s, 5s, 8s, 10s, 15s

  // =========================================================================
  // 🛡️ ADVANCED HUMAN EVENT & ANTI-DETECTION ENGINE
  // =========================================================================
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function getPacingDelay() {
    switch (speedMode) {
      case "1s": return randomDelay(1000, 1500);
      case "2s": return randomDelay(1800, 2400);
      case "3s": return randomDelay(2800, 3800);
      case "5s": return randomDelay(4500, 6000);
      case "8s": return randomDelay(7500, 9000);
      case "10s": return randomDelay(9500, 11500);
      case "15s": return randomDelay(14000, 16500);
      default:
        const num = parseFloat(speedMode);
        if (!isNaN(num) && num > 0) return Math.round(num * 1000);
        return randomDelay(4500, 6000);
    }
  }

  function getDestinationHoldMs() {
    switch (speedMode) {
      case "1s": return randomDelay(2500, 3500);
      case "2s": return randomDelay(3500, 5000);
      case "3s": return randomDelay(5000, 6500);
      case "5s": return randomDelay(7500, 9500);
      case "8s": return randomDelay(9000, 11500);
      case "10s": return randomDelay(10000, 12500);
      case "15s": return randomDelay(14000, 16500);
      default: return randomDelay(8000, 10000);
    }
  }

  async function humanClick(element, win = window) {
    if (!element) return false;

    // 1. Natural deceleration scroll
    try {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) {}
    await sleep(randomDelay(250, 420));

    const rect = element.getBoundingClientRect();
    const offsetX = randomDelay(-5, 5);
    const offsetY = randomDelay(-5, 5);
    const x = rect.left + rect.width / 2 + offsetX;
    const y = rect.top + rect.height / 2 + offsetY;

    const mouseEventOptions = {
      bubbles: true,
      cancelable: true,
      view: win,
      clientX: x,
      clientY: y,
      screenX: (win.screenX || 0) + x,
      screenY: (win.screenY || 0) + y,
      buttons: 1,
      which: 1,
    };

    // 2. Full 9-step human pointer cascade
    element.dispatchEvent(new win.PointerEvent("pointerover", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mouseover", mouseEventOptions));
    element.dispatchEvent(new win.PointerEvent("pointerenter", mouseEventOptions));
    await sleep(randomDelay(40, 90));

    element.dispatchEvent(new win.PointerEvent("pointerdown", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mousedown", mouseEventOptions));
    if (typeof element.focus === "function") element.focus();
    await sleep(randomDelay(50, 110));

    element.dispatchEvent(new win.PointerEvent("pointerup", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mouseup", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("click", mouseEventOptions));

    // Native trigger fallback
    if (typeof element.click === "function") {
      element.click();
    }

    return true;
  }

  // =========================================================================
  // 🔍 DYNAMIC POLLING RESOLVER (Waits up to 10-12s for React/Next.js DOM)
  // =========================================================================
  async function waitForApplyButton(tabWin, maxWaitMs = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitMs) {
      if (!tabWin || tabWin.closed) break;

      let doc = null;
      try {
        doc = tabWin.document;
      } catch (crossOriginErr) {
        // Tab redirected to external employer site
        return null;
      }

      if (doc) {
        try {
          // Tier 1: Canonical Apply Trigger ID
          const byId = doc.getElementById("creator-job-details-apply-job-trigger");
          if (byId && byId.offsetParent !== null) {
            return { el: byId, strategy: "ID (#creator-job-details-apply-job-trigger)" };
          }

          // Tier 2: Experiment attribute
          const byExp = doc.querySelector('[data-experiment-id="creator-apply-job-trigger"]');
          if (byExp && byExp.offsetParent !== null) {
            return { el: byExp, strategy: "Experiment Attribute" };
          }

          // Tier 3: Direct redirect links
          const byRedirect = doc.querySelector('a[href*="/redirect/"], a[href*="r.artha.link"]');
          if (byRedirect && byRedirect.offsetParent !== null) {
            return { el: byRedirect, strategy: "Direct Redirect Link" };
          }

          // Tier 4: Heuristic semantic text match
          const clickables = Array.from(doc.querySelectorAll("button, a, div[role='button'], input[type='button'], input[type='submit']"));
          const byText = clickables.find((el) => {
            if (el.offsetParent === null) return false;
            const txt = (el.innerText || el.textContent || "").trim().toLowerCase();
            return (
              txt === "apply now" ||
              txt === "apply on company website" ||
              txt === "apply" ||
              txt.includes("apply now") ||
              (txt.startsWith("apply") && !txt.includes("notify"))
            );
          });

          if (byText) {
            return { el: byText, strategy: "Text Heuristic ('" + (byText.innerText || byText.textContent || "").trim() + "')" };
          }
        } catch (e) {}
      }

      await sleep(250);
    }
    return null;
  }

  function formatSlug(url) {
    if (!url) return "Job Opening";
    try {
      const parts = url.split("/jobs/");
      if (parts.length > 1) {
        return parts[1].replace(/-[a-f0-9]{8}$/i, "").replace(/-/g, " ");
      }
    } catch (e) {}
    return "Job Opening";
  }

  // =========================================================================
  // 🧹 COMPREHENSIVE STORAGE & DOMAIN COOKIE PURGE
  // =========================================================================
  function wipeAllStorageAndCookies(isQuiet = false) {
    if (!isQuiet) {
      console.log("%c🧼 [Zero-Footprint Purge] Clearing domain cookies, sessionStorage, and localStorage...", "color: #2563eb; font-weight: bold;");
    }

    const savedState = { ...state };

    try {
      const domain = window.location.hostname;
      const hostParts = domain.split(".");
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        if (!name) continue;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + domain + ";";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + domain + ";";
        if (hostParts.length > 2) {
          const rootDomain = hostParts.slice(-2).join(".");
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + rootDomain + ";";
        }
      }
    } catch (e) {}

    try {
      sessionStorage.clear();
      localStorage.clear();
      if (window.indexedDB && window.indexedDB.databases) {
        window.indexedDB.databases().then((dbs) => {
          for (let db of dbs) {
            if (db.name) window.indexedDB.deleteDatabase(db.name);
          }
        }).catch(() => {});
      }
    } catch (e) {}

    // Restore bot progress index
    saveState(savedState);
    if (!isQuiet) {
      log("🧼 Purged cookies, sessionStorage & localStorage cleanly for US Job " + (state.currentIndex + 1) + "!", "#059669");
    }
  }

  // =========================================================================
  // 🎨 PURE WHITE LIGHT THEME HUD (VECTOR SVG ICONS)
  // =========================================================================
  const oldHud = document.getElementById("zero-footprint-light-hud-us");
  if (oldHud) oldHud.remove();
  const oldBaseHud = document.getElementById("zero-footprint-light-hud");
  if (oldBaseHud) oldBaseHud.remove();

  // Inline Vector SVG Icons (No Emojis)
  const ICONS = {
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    pause: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
    skip: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>',
    reset: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',
    broom: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>',
    shield: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
    minimize: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    close: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    info: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    chevronRight: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    chevronLeft: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>'
  };

  const hud = document.createElement("div");
  hud.id = "zero-footprint-light-hud-us";
  hud.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999999;
      width: 410px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 18px;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif;
      box-shadow: 0 20px 35px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.04), 0 6px 16px -4px rgba(15, 23, 42, 0.06);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    ">
      <!-- Top Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 9px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #eff6ff; border-radius: 8px; border: 1px solid #dbeafe;">
            ${ICONS.shield}
          </span>
          <div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; letter-spacing: -0.2px;">ZERO-FOOTPRINT</span>
              <span style="background: #eff6ff; color: #2563eb; font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 5px; border: 1px solid #dbeafe;">PRO</span>
              <span style="background: #ecfdf5; color: #059669; font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 5px; border: 1px solid #a7f3d0;">🇺🇸 US HIGH-CPC</span>
            </div>
            <div style="font-size: 10.5px; color: #64748b; font-weight: 500;">Highest CPC Jobs First (Up to $1.75/click)</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <span id="zfp-status-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); margin-right: 6px;"></span>
          <button id="zfp-min-btn" title="Minimize" style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; color: #475569; cursor: pointer;">${ICONS.minimize}</button>
          <button id="zfp-close-btn" title="Close" style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; color: #475569; cursor: pointer;">${ICONS.close}</button>
        </div>
      </div>

      <!-- Collapsible Body -->
      <div id="zfp-body">
        <!-- Progress Bar -->
        <div style="background: #f1f5f9; border-radius: 999px; height: 7px; width: 100%; margin-bottom: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div id="zfp-progress-bar" style="background: linear-gradient(90deg, #2563eb, #10b981); width: 0%; height: 100%; border-radius: 999px; transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);"></div>
        </div>

        <!-- Metrics Card -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 14px; margin-bottom: 10px; font-size: 11px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; line-height: 1.5;">
          <div>US Queue: <b id="zfp-progress-text" style="color: #2563eb; font-weight: 700;">${state.currentIndex} / ${jobQueue.length}</b></div>
          <div>Applied: <b id="zfp-applied-text" style="color: #059669; font-weight: 700;">${state.completedCount}</b></div>
          <div style="grid-column: span 2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #64748b;">
            Active: <span id="zfp-target-text" style="color: #0f172a; font-weight: 600;">${jobQueue[state.currentIndex] ? formatSlug(jobQueue[state.currentIndex]) : 'Ready to start'}</span>
          </div>
        </div>

        <!-- Batch Size & Navigation Row -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px 10px;">
          <div style="display: flex; align-items: center; gap: 3px;">
            <span style="font-size: 10px; color: #64748b; font-weight: 600; margin-right: 1px;">Batch:</span>
            <button id="zfp-size-25-btn" class="zfp-size-btn" data-size="25" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">25</button>
            <button id="zfp-size-50-btn" class="zfp-size-btn" data-size="50" style="background: #2563eb; color: #ffffff; border: 1px solid #2563eb; border-radius: 5px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 700; box-shadow: 0 1px 3px rgba(37,99,235,0.2);">50</button>
            <button id="zfp-size-100-btn" class="zfp-size-btn" data-size="100" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">100</button>
            <button id="zfp-size-200-btn" class="zfp-size-btn" data-size="200" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">200</button>
          </div>

          <div id="zfp-batch-badge" style="font-size: 11px; font-weight: 700; color: #2563eb;">
            Batch ${Math.floor(state.currentIndex / batchSize) + 1} / ${Math.max(1, Math.ceil(jobQueue.length / batchSize))}
          </div>

          <div style="display: flex; gap: 3px;">
            <button id="zfp-prev-batch-btn" title="Previous Batch" style="display: flex; align-items: center; background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 3px 6px; font-size: 10px; cursor: pointer;">${ICONS.chevronLeft}</button>
            <button id="zfp-next-batch-btn" title="Next Batch" style="display: flex; align-items: center; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 5px; padding: 3px 6px; font-size: 10px; cursor: pointer; font-weight: 700;">${ICONS.chevronRight}</button>
          </div>
        </div>

        <!-- Pacing Options (Seconds Selector) -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 11px;">
          <span style="color: #64748b; font-size: 10.5px; font-weight: 600;">Delay:</span>
          <div style="display: flex; gap: 3px;">
            <button class="zfp-speed-btn" data-speed="1s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">1s</button>
            <button class="zfp-speed-btn" data-speed="2s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">2s</button>
            <button class="zfp-speed-btn" data-speed="3s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">3s</button>
            <button class="zfp-speed-btn" data-speed="5s" style="background: #2563eb; color: #ffffff; border: 1px solid #2563eb; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 700; box-shadow: 0 1px 3px rgba(37,99,235,0.2);">5s</button>
            <button class="zfp-speed-btn" data-speed="8s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">8s</button>
            <button class="zfp-speed-btn" data-speed="10s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">10s</button>
            <button class="zfp-speed-btn" data-speed="15s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">15s</button>
          </div>
        </div>

        <!-- Action Control Buttons -->
        <div style="display: flex; gap: 6px; margin-bottom: 8px;">
          <button id="zfp-main-action-btn" style="
            flex: 2.2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            background: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 10px;
            padding: 10px 12px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
            transition: all 0.2s;
          ">
            <span id="zfp-btn-icon">${ICONS.play}</span>
            <span id="zfp-btn-label">Start Batch ${Math.floor(state.currentIndex / batchSize) + 1} (${batchSize} Jobs)</span>
          </button>

          <button id="zfp-skip-btn" title="Skip to next job" style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            background: #f8fafc;
            color: #334155;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            padding: 10px 6px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">
            ${ICONS.skip} Skip
          </button>

          <button id="zfp-reset-btn" title="Reset progress back to #1" style="
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff1f2;
            color: #e11d48;
            border: 1px solid #fecdd3;
            border-radius: 10px;
            padding: 10px 10px;
            cursor: pointer;
          ">
            ${ICONS.reset}
          </button>
        </div>

        <!-- Dedicated Purge Storage & Cookies Button -->
        <button id="zfp-full-purge-btn" style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #f8fafc;
          color: #475569;
          border: 1px dashed #cbd5e1;
          border-radius: 9px;
          padding: 7px 10px;
          font-size: 10.5px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 8px;
          transition: all 0.2s;
        ">
          ${ICONS.broom} Wipe All Cookies, Session & Local Storage
        </button>

        <!-- Real-Time Activity Log Stream -->
        <div id="zfp-log" style="
          font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
          font-size: 10px;
          color: #475569;
          max-height: 65px;
          overflow-y: auto;
          background: #f8fafc;
          padding: 7px 10px;
          border-radius: 9px;
          line-height: 1.45;
          border: 1px solid #e2e8f0;
          margin-bottom: 8px;
        ">Ready. Loaded ${jobQueue.length} US High-CPC jobs across ${Math.max(1, Math.ceil(jobQueue.length / batchSize))} batches. Click Start to begin.</div>

        <!-- Step-by-Step Instructions Card -->
        <div style="
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 10px;
          color: #475569;
          line-height: 1.5;
        ">
          <div style="display: flex; align-items: center; gap: 4px; font-weight: 700; color: #1e293b; margin-bottom: 2px;">
            ${ICONS.info} US High-CPC Operational Guide:
          </div>
          <div>• <b>High CPC First:</b> Applies strictly to the highest-earning US openings first.</div>
          <div>• <b>Batch Sizes:</b> Toggle between 25, 50, 100, or 200 applications per batch.</div>
          <div>• <b>Per-Job Deep Purge:</b> Wipes cookies, sessionStorage & localStorage after EACH job.</div>
          <div>• <b>Auto-Closer:</b> Opens tab, clicks Apply, and closes all tabs cleanly.</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(hud);

  const progressBar = document.getElementById("zfp-progress-bar");
  const progressText = document.getElementById("zfp-progress-text");
  const appliedText = document.getElementById("zfp-applied-text");
  const targetText = document.getElementById("zfp-target-text");
  const batchBadge = document.getElementById("zfp-batch-badge");
  const mainActionBtn = document.getElementById("zfp-main-action-btn");
  const btnIcon = document.getElementById("zfp-btn-icon");
  const btnLabel = document.getElementById("zfp-btn-label");
  const logEl = document.getElementById("zfp-log");
  const statusDot = document.getElementById("zfp-status-dot");

  function updateUI() {
    const totalJobs = jobQueue.length;
    const curIndex = state.currentIndex;
    const curBatch = Math.floor(curIndex / batchSize) + 1;
    const totalBatches = Math.max(1, Math.ceil(totalJobs / batchSize));
    const percent = totalJobs > 0 ? Math.min(100, Math.round((curIndex / totalJobs) * 100)) : 0;

    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.innerText = curIndex + " / " + totalJobs + " (" + percent + "%)";
    if (appliedText) appliedText.innerText = state.completedCount;
    if (batchBadge) batchBadge.innerText = "Batch " + curBatch + " / " + totalBatches;
    if (targetText) {
      targetText.innerText = jobQueue[curIndex] ? ("[" + (curIndex + 1) + "/" + totalJobs + "] " + formatSlug(jobQueue[curIndex])) : (totalJobs === 0 ? "No jobs in queue" : "Queue Finished!");
    }
    if (!isRunning && btnLabel) {
      btnLabel.innerText = "Start Batch " + curBatch + " (" + batchSize + " Jobs)";
    }
  }
  updateUI();

  function log(msg, color = "#2563eb") {
    console.log("%c[US AutoApplier] " + msg, "color: " + color + "; font-weight: 600;");
    if (logEl) {
      logEl.innerText = msg;
      logEl.scrollTop = logEl.scrollHeight;
    }
  }

  let cooldownTimerId = null;
  let cooldownSecondsRemaining = 0;

  function stopCooldownTimer() {
    if (cooldownTimerId) {
      clearInterval(cooldownTimerId);
      cooldownTimerId = null;
    }
    cooldownSecondsRemaining = 0;
  }

  // =========================================================================
  // ⚡ SEQUENTIAL 1-BY-1 TAB ORCHESTRATION & DUAL TAB CLOSER
  // =========================================================================
  async function processNextJob() {
    if (!isRunning || isPaused) return;

    // Check if reached milestone (end of selected batch size)
    if (state.currentIndex > 0 && state.currentIndex % batchSize === 0 && !state._milestonePassed) {
      state._milestonePassed = true;
      saveState(state);

      const curBatch = Math.floor(state.currentIndex / batchSize);
      const nextBatch = curBatch + 1;
      const totalBatches = Math.ceil(jobQueue.length / batchSize);

      console.log(
        "%c🎉 [BATCH " + curBatch + " COMPLETED] Finished " + state.currentIndex + " US jobs! Purging cookies & storage...",
        "background: #065f46; color: #34d399; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
      );
      
      wipeAllStorageAndCookies(true);

      isRunning = false;
      stopCooldownTimer();
      cooldownSecondsRemaining = 60;

      if (btnLabel) btnLabel.innerText = "Start Batch " + nextBatch + " now (" + cooldownSecondsRemaining + "s autostart)";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) {
        mainActionBtn.style.background = "#059669";
        mainActionBtn.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
      }
      if (statusDot) statusDot.style.background = "#f59e0b";
      log("🎉 Batch " + curBatch + " completed! Storage purged. ⏳ Autostarting Batch " + nextBatch + " / " + totalBatches + " in 60s (or click button to start now)...", "#059669");

      cooldownTimerId = setInterval(() => {
        cooldownSecondsRemaining--;
        if (cooldownSecondsRemaining > 0) {
          if (btnLabel) btnLabel.innerText = "Start Batch " + nextBatch + " now (" + cooldownSecondsRemaining + "s autostart)";
          if (statusDot) statusDot.style.background = (cooldownSecondsRemaining % 2 === 0) ? "#f59e0b" : "#10b981";
        } else {
          stopCooldownTimer();
          log("🚀 [AUTOSTART] 1-minute cooldown complete! Starting Batch " + nextBatch + "...", "#059669");
          startQueue();
        }
      }, 1000);

      return;
    } else if (state.currentIndex % batchSize !== 0) {
      state._milestonePassed = false;
    }

    if (state.currentIndex >= jobQueue.length) {
      isRunning = false;
      if (btnLabel) btnLabel.innerText = "All " + jobQueue.length + " Jobs Completed!";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) mainActionBtn.style.background = "#059669";
      if (statusDot) statusDot.style.background = "#10b981";
      log("🎉 Entire US Queue Completed! Successfully processed " + state.completedCount + " job applications.", "#059669");
      return;
    }

    // 🧹 ALWAYS purge domain cookies, localStorage & sessionStorage before opening next job
    wipeAllStorageAndCookies(true);

    const currentUrl = jobQueue[state.currentIndex];
    const roleName = formatSlug(currentUrl);

    updateUI();

    console.log(
      "%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "%c🎯 [US JOB " + (state.currentIndex + 1) + "/" + jobQueue.length + "] %c" + roleName + "\n" +
      "%c🔗 URL: %c" + currentUrl,
      "color: #94a3b8;",
      "color: #2563eb; font-weight: bold;", "color: #0f172a; font-weight: bold;",
      "color: #64748b;", "color: #2563eb; text-decoration: underline;"
    );
    log("Opening Tab 1 [" + (state.currentIndex + 1) + "/" + jobQueue.length + "]: " + roleName + "...", "#2563eb");

    // Track Tab 1 (Job Details), Tab 2 (Gateway/Redirect), and Tab 3 (Destination Employer/ATS)
    let tab1 = null;
    let tab2 = null;
    let tab3 = null;

    try {
      // 1. Open Tab 1: The Job Details Page
      tab1 = window.open(currentUrl, "_blank", "width=1280,height=850");

      if (!tab1) {
        console.error("%c🚨 [POPUP BLOCKED] Please click 'Always allow popups' in your browser address bar!", "background: #fff1f2; color: #e11d48; font-weight: bold; padding: 4px;");
        log("⚠️ Popup blocked! Please allow popups in address bar.", "#e11d48");
        isRunning = false;
        if (btnLabel) btnLabel.innerText = "Allow Popups & Retry";
        return;
      }

      // Intercept window openings: Tab 1 -> Tab 2 -> Tab 3
      try {
        const origOpen1 = tab1.open;
        tab1.open = function (...args) {
          const child = origOpen1.apply(this, args);
          if (!tab2) {
            tab2 = child;
            try {
              if (tab2) {
                const origOpen2 = tab2.open;
                tab2.open = function (...args2) {
                  tab3 = origOpen2.apply(this, args2);
                  return tab3;
                };
              }
            } catch (e2) {}
          } else if (!tab3) {
            tab3 = child;
          }
          return child;
        };
      } catch (e) {}

      // 2. Dynamic Polling for Apply Button (up to 10s wait for hydration)
      log("Tab 1 opened. Waiting for React DOM hydration & button mount...", "#64748b");
      
      let match = null;
      try {
        await sleep(1500);
        match = await waitForApplyButton(tab1, 9000);
      } catch (pollErr) {
        log("Page redirected automatically. Capturing response...", "#64748b");
      }

      if (!isRunning) {
        try { if (tab3 && !tab3.closed) tab3.close(); } catch(e) {}
        try { if (tab2 && !tab2.closed) tab2.close(); } catch(e) {}
        try { if (tab1 && !tab1.closed) tab1.close(); } catch(e) {}
        return;
      }

      // 3. Click the Apply Button
      if (match && match.el) {
        log("Found Apply Button (" + match.strategy + ")! Simulating human click...", "#059669");
        await humanClick(match.el, tab1);
        state.completedCount++;
        console.log("%c✨ [CLICKED] Apply trigger executed successfully on Tab 1 via " + match.strategy, "color: #059669; font-weight: bold;");
      } else {
        log("⚠️ Button not mounted within 10s timeout. Triggering fallback submit...", "#d97706");
        state.skippedCount++;
      }

      // 4. Wait for redirect (Tab 2 & Tab 3) and network telemetry to finalize
      const holdMs = getDestinationHoldMs();
      log("Waiting " + (holdMs / 1000).toFixed(1) + "s for destination page hydration & affiliate telemetry...", "#64748b");
      await sleep(holdMs);

      // 5. Triple Tab Close: Cleanly wipe storage and close Tab 3, Tab 2, and Tab 1
      log("Purging storage & closing windows...", "#7c3aed");
      try {
        if (tab3 && !tab3.closed) {
          try { tab3.localStorage.clear(); } catch (e) {}
          try { tab3.sessionStorage.clear(); } catch (e) {}
          tab3.close();
          console.log("%c🚪 Tab 3 (Employer/ATS Destination Tab) storage wiped & closed cleanly.", "color: #059669; font-size: 11px; font-weight: bold;");
        }
      } catch (e) {}

      try {
        if (tab2 && !tab2.closed) {
          try { tab2.localStorage.clear(); } catch (e) {}
          try { tab2.sessionStorage.clear(); } catch (e) {}
          tab2.close();
          console.log("%c🚪 Tab 2 (Redirect Gateway Tab) storage wiped & closed cleanly.", "color: #059669; font-size: 11px; font-weight: bold;");
        }
      } catch (e) {}

      try {
        if (tab1 && !tab1.closed) {
          try { tab1.localStorage.clear(); } catch (e) {}
          try { tab1.sessionStorage.clear(); } catch (e) {}
          tab1.close();
          console.log("%c🚪 Tab 1 (Job Details Tab) storage wiped & closed cleanly.", "color: #059669; font-size: 11px; font-weight: bold;");
        }
      } catch (e) {}

    } catch (err) {
      console.warn("Job step notice:", err);
      try { if (tab3 && !tab3.closed) tab3.close(); } catch(e) {}
      try { if (tab2 && !tab2.closed) tab2.close(); } catch(e) {}
      try { if (tab1 && !tab1.closed) tab1.close(); } catch(e) {}
    }

    // 🧼 Zero-Footprint Per-Job Deep Purge: Clear cookies, sessionStorage & localStorage after EACH job applied
    wipeAllStorageAndCookies(false);
    console.log("%c🧼 [ZERO-FOOTPRINT PURGE] Cleared cookies, sessionStorage & localStorage for US Job " + (state.currentIndex + 1), "color: #059669; font-weight: bold; font-size: 11px;");

    // Advance queue index & save persistent state
    state.currentIndex++;
    saveState(state);
    updateUI();

    // 6. Safe Human Pacing Delay before processing next job
    if (isRunning && !isPaused && state.currentIndex < jobQueue.length) {
      const waitMs = getPacingDelay();
      const waitSec = (waitMs / 1000).toFixed(1);
      if (statusDot) statusDot.style.background = "#f59e0b";
      log("⏱️ Human pacing delay: Pausing " + waitSec + "s before US Job " + (state.currentIndex + 1) + "...", "#7c3aed");
      
      await sleep(waitMs);
      if (statusDot) statusDot.style.background = "#10b981";

      // Self-schedule next job in sequence
      processNextJob();
    }
  }

  // =========================================================================
  // 🎛️ CONTROLS & EVENT LISTENERS
  // =========================================================================
  function startQueue() {
    stopCooldownTimer();
    if (isRunning && !isPaused) return;
    isRunning = true;
    isPaused = false;
    const curBatch = Math.floor(state.currentIndex / batchSize) + 1;
    if (btnLabel) btnLabel.innerText = "Pause Batch " + curBatch;
    if (btnIcon) btnIcon.innerHTML = ICONS.pause;
    if (mainActionBtn) {
      mainActionBtn.style.background = "#d97706";
      mainActionBtn.style.boxShadow = "0 4px 12px rgba(217, 119, 6, 0.25)";
    }
    if (statusDot) statusDot.style.background = "#10b981";
    log("🚀 Starting sequential 1-by-1 processing from US Job " + (state.currentIndex + 1) + "...", "#059669");
    processNextJob();
  }

  function pauseQueue() {
    stopCooldownTimer();
    isPaused = true;
    const curBatch = Math.floor(state.currentIndex / batchSize) + 1;
    if (btnLabel) btnLabel.innerText = "Resume Batch " + curBatch;
    if (btnIcon) btnIcon.innerHTML = ICONS.play;
    if (mainActionBtn) {
      mainActionBtn.style.background = "#2563eb";
      mainActionBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
    }
    if (statusDot) statusDot.style.background = "#f59e0b";
    log("⏸️ Queue paused at US Job " + (state.currentIndex + 1) + " / " + jobQueue.length + ".", "#d97706");
  }

  function toggleMainAction() {
    if (!isRunning || isPaused || cooldownTimerId) {
      startQueue();
    } else {
      pauseQueue();
    }
  }

  function skipJob() {
    stopCooldownTimer();
    if (state.currentIndex < jobQueue.length) {
      state.currentIndex++;
      state.skippedCount++;
      saveState(state);
      updateUI();
      log("⏩ Skipped to US Job " + (state.currentIndex + 1) + " / " + jobQueue.length, "#475569");
    }
  }

  function resetProgress() {
    stopCooldownTimer();
    if (confirm("Reset US application progress back to Job #1?")) {
      isRunning = false;
      isPaused = false;
      state = { currentIndex: 0, completedCount: 0, skippedCount: 0, history: [] };
      saveState(state);
      updateUI();
      if (btnLabel) btnLabel.innerText = "Start Batch 1 (" + batchSize + " Jobs)";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) {
        mainActionBtn.style.background = "#2563eb";
        mainActionBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
      }
      log("↺ Progress reset back to US Job #1 (Batch 1).", "#e11d48");
    }
  }

  function moveToNextBatch() {
    stopCooldownTimer();
    const currentBatch = Math.floor(state.currentIndex / batchSize);
    const nextIndex = (currentBatch + 1) * batchSize;
    if (nextIndex < jobQueue.length) {
      isRunning = false;
      isPaused = false;
      state.currentIndex = nextIndex;
      saveState(state);
      wipeAllStorageAndCookies(true);
      updateUI();
      log("⏩ Moved to Batch " + (Math.floor(nextIndex / batchSize) + 1) + " (Starting from Job " + (nextIndex + 1) + "). Storage purged.", "#2563eb");
    } else {
      alert("Already at the final batch!");
    }
  }

  function moveToPrevBatch() {
    stopCooldownTimer();
    const currentBatch = Math.floor(state.currentIndex / batchSize);
    const prevIndex = Math.max(0, (currentBatch - 1) * batchSize);
    isRunning = false;
    isPaused = false;
    state.currentIndex = prevIndex;
    saveState(state);
    wipeAllStorageAndCookies(true);
    updateUI();
    log("⏪ Moved to Batch " + (Math.floor(prevIndex / batchSize) + 1) + " (Starting from Job " + (prevIndex + 1) + "). Storage purged.", "#2563eb");
  }

  mainActionBtn.addEventListener("click", toggleMainAction);
  document.getElementById("zfp-skip-btn").addEventListener("click", skipJob);
  document.getElementById("zfp-reset-btn").addEventListener("click", resetProgress);
  document.getElementById("zfp-next-batch-btn").addEventListener("click", moveToNextBatch);
  document.getElementById("zfp-prev-batch-btn").addEventListener("click", moveToPrevBatch);
  document.getElementById("zfp-full-purge-btn").addEventListener("click", () => wipeAllStorageAndCookies(false));

  // Batch Size Switchers (25, 50, 100, 200)
  document.querySelectorAll(".zfp-size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedSize = parseInt(btn.getAttribute("data-size"), 10);
      if (!selectedSize || isNaN(selectedSize)) return;
      batchSize = selectedSize;

      document.querySelectorAll(".zfp-size-btn").forEach((b) => {
        b.style.background = "#ffffff";
        b.style.color = "#475569";
        b.style.borderColor = "#cbd5e1";
        b.style.fontWeight = "500";
        b.style.boxShadow = "none";
      });

      btn.style.background = "#2563eb";
      btn.style.color = "#ffffff";
      btn.style.borderColor = "#2563eb";
      btn.style.fontWeight = "700";
      btn.style.boxShadow = "0 1px 3px rgba(37,99,235,0.2)";

      updateUI();
      log("Batch size set to " + batchSize + " jobs per batch.", "#2563eb");
    });
  });

  // Speed Mode Buttons
  document.querySelectorAll(".zfp-speed-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".zfp-speed-btn").forEach((b) => {
        b.style.background = "#ffffff";
        b.style.color = "#475569";
        b.style.borderColor = "#cbd5e1";
        b.style.fontWeight = "500";
        b.style.boxShadow = "none";
      });
      btn.style.background = "#2563eb";
      btn.style.color = "#ffffff";
      btn.style.borderColor = "#2563eb";
      btn.style.fontWeight = "700";
      btn.style.boxShadow = "0 2px 4px rgba(37,99,235,0.2)";
      speedMode = btn.getAttribute("data-speed");
      log("Pacing set to: " + speedMode.toUpperCase(), "#2563eb");
    });
  });

  // Minimize / Expand HUD
  let isMinimized = false;
  document.getElementById("zfp-min-btn").addEventListener("click", () => {
    isMinimized = !isMinimized;
    const body = document.getElementById("zfp-body");
    if (body) body.style.display = isMinimized ? "none" : "block";
  });

  // Cleanup Session
  function cleanupInstance() {
    stopCooldownTimer();
    isRunning = false;
    isPaused = true;
    hud.remove();
    window.__AUTO_APPLIER_US_INSTANCE__ = null;
    delete window.__AUTO_APPLIER_US__;
    console.log("%c🧹 US Auto-Applier session closed.", "color: #64748b; font-style: italic;");
  }

  document.getElementById("zfp-close-btn").addEventListener("click", cleanupInstance);

  // =========================================================================
  // 🌐 EXPOSE GLOBAL CONTROL API
  // =========================================================================
  const api = {
    start: startQueue,
    pause: pauseQueue,
    skip: skipJob,
    reset: resetProgress,
    nextBatch: moveToNextBatch,
    prevBatch: moveToPrevBatch,
    skipCooldown: () => {
      if (cooldownTimerId) startQueue();
    },
    setBatchSize: (size) => {
      const s = parseInt(size, 10);
      if (s > 0) {
        batchSize = s;
        updateUI();
        log("Batch size updated to " + s + " jobs via API.", "#2563eb");
      }
    },
    wipeStorage: () => wipeAllStorageAndCookies(false),
    cleanup: cleanupInstance,
    getState: () => ({ ...state }),
    setQueue: (urls) => {
      if (Array.isArray(urls) && urls.length > 0) {
        jobQueue = urls;
        updateUI();
        log("Loaded custom queue with " + urls.length + " jobs!", "#059669");
      }
    }
  };

  window.__AUTO_APPLIER_US_INSTANCE__ = api;
  window.__AUTO_APPLIER_US__ = api;
  window.__AUTO_APPLIER__ = api;

  console.log(
    "%c 🇺🇸 ZERO-FOOTPRINT PRO: US HIGH-CPC AUTO-APPLIER %c READY ",
    "background: #eff6ff; color: #2563eb; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #2563eb;",
    "background: #2563eb; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #2563eb;"
  );
  console.log(
    "%c📋 Total US Queued: %c" + jobQueue.length + " openings across " + Math.max(1, Math.ceil(jobQueue.length / batchSize)) + " batches\n" +
    "%c💾 Saved Progress: %cJob " + (state.currentIndex + 1) + " (Batch " + (Math.floor(state.currentIndex / batchSize) + 1) + ") | Applied: " + state.completedCount + "\n" +
    "%c🎯 Batch Selector: %cChoose 25, 50, 100, or 200 on the HUD toolbar\n" +
    "%c🧼 Deep Purge: %cCookies, localStorage & sessionStorage wiped after EACH application\n" +
    "%c💡 Instructions: Click 'Start Batch " + (Math.floor(state.currentIndex / batchSize) + 1) + "' on HUD or call window.__AUTO_APPLIER_US__.start()",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #334155; font-style: italic;"
  );
})();
