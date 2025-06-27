import pathlib
import requests
import yaml
import re
from bs4 import BeautifulSoup

# Project root and output directory
PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "data" / "integrations"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Known complete documentation integration IDs (slugified)
KNOWN_IDS = {
    'ashrae', 'azure_ad', 'google_workspace', 'hybrid_onpremise_active_directory',
    'oauth2_jwt', 'saml2', 'azure_ad_b2c', 'email', 'sms', 'mqtt', 'webhooks', 'node_red',
    'microsoft_365', 'placeos_native_booking',
    'rest_api', 'webhook_standard', 'tcp_ip', 'mqtt_protocol', 'snmpv2', 'knx', 'bacnet', 'modbus_tcp',
    'cisco_spaces', 'cisco_meraki_rtls', 'cisco_cmx', 'hp_aruba_ale', 'juniper_mist', 'kontaktio',
    'vergesense', 'floorsense', 'xy_sense', 'xovis', 'steinel', 'cms_engage', 'sensestudio', 'kaiterra', 'gobright', 'freespace', 'meraki_mv',
    'cisco_dna_spaces', 'cisco_meraki_net', 'cisco_cmx_net', 'cisco_ise', 'cisco_catalyst',
    'bacnet_secure_connect', 'johnson_controls_metasys', 'siemens_desigo', 'delta_controls',
    'gallagher', 'lenel', 'inner_range_integriti', 'rhombus', 'axiomxa',
    'igor', 'leviton',
    'cisco_collab_endpoints', 'microsoft_teams', 'pexip_management_api', 'polycom_realpresence', 'cisco_webex_instant_connect', 'zoom_rooms_api',
    'lg_displays', 'nec_displays', 'panasonic_displays', 'sony_displays', 'samsung_displays', 'sharp_displays', 'screen_technics', 'pjlink_projectors', 'commbox',
    'extron_switchers', 'atlona_voip', 'lightware_switchers', 'svsi', 'kramer_switchers', 'echo360_capture', 'mediasite_capture', 'axis_cameras', 'sony_cameras', 'barco_clickshare', 'tripleplay', 'microsoft_surface_hub', 'wolfvision_document_cameras', 'lumens_document_cameras',
    'qsc_qsys', 'crestron_nvx', 'extron_nav',
    'qsc_qsys_audio', 'biamp', 'shure', 'clearone', 'denon', 'clock_audio', 'bose_controlspace', 'powersoft', 'symmetrix',
    'knx_ip', 'cbus', 'dynalite', 'lutron', 'dali', 'helvar',
    'global_cache', 'kentix_sensors', 'foxtel_set_top_box', 'gantner_relaxx_lockers', 'crestron_fusion'
}

# Base schema template for each integration
def base_schema():
    return {
        "id": None,
        "entityType": "Integration",
        "name": None,
        "vendor": None,
        "category": ["Other"],
        "description": "",
        "supportedFeatures": [],
        "tags": []
    }

# Utility to slugify integration names
def slugify(text):
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s-]+", "_", text)
    return text.strip("_")

# Fetch and parse the drivers page
response = requests.get("https://placeos.github.io/drivers/index.html")
soup = BeautifulSoup(response.text, "html.parser")

# Locate the "Drivers" list
h1 = soup.find("h1", string=lambda t: t and "drivers" in t.lower())
main_ul = h1.find_next_sibling("ul") if h1 else soup.find_all("ul")[1]

# Track missing integrations
missing = []

# Process only top-level items for integrations
for li in main_ul.find_all("li", recursive=False):
    a = li.find("a", recursive=False)
    name_text = a.get_text(strip=True) if a else li.get_text(strip=True)
    driver_id = slugify(name_text)

    # Populate schema and write YAML
    schema = base_schema()
    schema["id"] = driver_id
    schema["name"] = name_text
    schema["vendor"] = name_text
    filepath = OUTPUT_DIR / f"{driver_id}.yaml"
    with open(filepath, "w") as f:
        yaml.dump(schema, f, sort_keys=False)

    # If not in known docs list, mark missing
    if driver_id not in KNOWN_IDS:
        missing.append(driver_id)
    print(f"→ wrote {filepath}")

# Report missing integrations that need manual details
print("\nMissing integrations (need completion):")
for m in missing:
    print(f"- {m}")
