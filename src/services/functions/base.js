import Airtable from "airtable";

const VITE_AIRTABLE_KEY = import.meta.env.VITE_AIRTABLE_KEY;
const VITE_AIRTABLE_BASE = import.meta.env.VITE_AIRTABLE_BASE;

const baseAirtable = new Airtable({ apiKey: VITE_AIRTABLE_KEY }).base(
  VITE_AIRTABLE_BASE
);

export default baseAirtable;