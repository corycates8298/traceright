// src/lib/ai-vision-prompts.ts

/**
 * TYPE DEFINITIONS for AI Vision Output
 * These interfaces mirror the required structured JSON output from the
 * Gemini model.
 */

export type BarcodeResult = {
  type: string; // e.g., 'UPC', 'QR_CODE', 'CODE_128'
  value: string;
  location: string; // e.g., 'Top left box', 'Lower shipping label'
};

export interface TextRecognitionResult {
  key: string; // e.g., 'PO_NUMBER', 'LOT_CODE', 'SHIP_DATE'
  value: string;
  confidence: number; // 0.0 to 1.0
}

export interface ObjectCountingResult {
  object: string; // e.g., 'Pallet', 'Box', 'Individual Unit'
  count: number;
}

export type DamageSeverity = 'NONE' | 'MINOR' | 'MODERATE' | 'SEVERE' | 'CRITICAL';

export interface DamageAssessment {
  detected: boolean;
  damageType: string; // e.g., 'Tear', 'Water Damage', 'Crush/Dent'
  severity: DamageSeverity;
  location: string; // e.g., 'Right side, mid-height'
  recommendation: string; // Action suggested based on severity
}

export interface ComplianceCheck {
  hazmatDetected: boolean;
  requiredMarkingsPresent: boolean;
  violations?: string[];
}

export interface VisionAnalysisResult {
  barcodes: BarcodeResult[];
  textRecognition: TextRecognitionResult[];
  objectCounting: ObjectCountingResult[];
  damageAssessment: DamageAssessment;
  complianceCheck: ComplianceCheck;
  summary: string;
  confidence: number;
  timestamp: string;
}

/**
 * MASTER PROMPT for Gemini Vision Analysis
 * This prompt forces structured JSON output for all analysis steps
 */
export const VISION_ANALYSIS_PROMPT = `
You are an AI-powered supply chain vision analyst. Analyze the provided image and return ONLY valid JSON in this exact structure:

{
  "barcodes": [
    {
      "type": "string (e.g., 'UPC', 'QR_CODE', 'CODE_128')",
      "value": "string (decoded value)",
      "location": "string (position description)"
    }
  ],
  "textRecognition": [
    {
      "key": "string (e.g., 'PO_NUMBER', 'LOT_CODE', 'SHIP_DATE')",
      "value": "string (extracted text)",
      "confidence": number (0.0 to 1.0)
    }
  ],
  "objectCounting": [
    {
      "object": "string (e.g., 'Pallet', 'Box', 'Individual Unit')",
      "count": number
    }
  ],
  "damageAssessment": {
    "detected": boolean,
    "damageType": "string (e.g., 'Tear', 'Water Damage', 'Crush/Dent')",
    "severity": "NONE | MINOR | MODERATE | SEVERE | CRITICAL",
    "location": "string (position description)",
    "recommendation": "string (suggested action)"
  },
  "complianceCheck": {
    "hazmatDetected": boolean,
    "requiredMarkingsPresent": boolean,
    "violations": ["string array of any violations"]
  },
  "summary": "string (brief executive summary)",
  "confidence": number (0.0 to 1.0, overall analysis confidence),
  "timestamp": "ISO 8601 timestamp"
}

Analysis Instructions:
1. BARCODES: Scan for all visible barcodes, QR codes, and identify their type and location
2. TEXT RECOGNITION: Extract key information (PO numbers, lot codes, dates, addresses, product names)
3. OBJECT COUNTING: Count visible items (pallets, boxes, units) and categorize
4. DAMAGE ASSESSMENT: Inspect for any visible damage, rate severity, suggest action
5. COMPLIANCE: Check for hazmat symbols, required safety markings, label completeness

Return ONLY the JSON object, no additional text or explanation.
`;

/**
 * QUICK ANALYSIS PROMPTS
 * Shorter prompts for specific analysis tasks
 */

export const BARCODE_SCAN_PROMPT = `
Scan this image for all barcodes and QR codes. Return JSON:
{
  "barcodes": [
    {"type": "string", "value": "string", "location": "string"}
  ]
}
`;

export const DAMAGE_INSPECTION_PROMPT = `
Inspect this shipment/package for damage. Return JSON:
{
  "damageAssessment": {
    "detected": boolean,
    "damageType": "string",
    "severity": "NONE | MINOR | MODERATE | SEVERE | CRITICAL",
    "location": "string",
    "recommendation": "string"
  }
}
`;

export const INVENTORY_COUNT_PROMPT = `
Count the visible items in this image. Return JSON:
{
  "objectCounting": [
    {"object": "string", "count": number}
  ]
}
`;

export const LABEL_VERIFICATION_PROMPT = `
Verify shipping label information. Return JSON:
{
  "textRecognition": [
    {"key": "string", "value": "string", "confidence": number}
  ],
  "complianceCheck": {
    "hazmatDetected": boolean,
    "requiredMarkingsPresent": boolean,
    "violations": []
  }
}
`;

/**
 * RESPONSE PARSER
 * Helper to parse and validate Gemini's JSON response
 */
export function parseVisionResponse(response: string): VisionAnalysisResult | null {
  try {
    // Remove markdown code blocks if present
    const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);
    
    // Validate structure
    if (!parsed.summary || typeof parsed.confidence !== 'number') {
      console.error('Invalid vision response structure');
      return null;
    }
    
    return parsed as VisionAnalysisResult;
  } catch (error) {
    console.error('Failed to parse vision response:', error);
    return null;
  }
}

/**
 * SAMPLE MOCK RESPONSES
 * For testing without actual Gemini API
 */
export const MOCK_VISION_RESULTS: VisionAnalysisResult[] = [
  {
    barcodes: [
      { type: 'QR_CODE', value: 'SH-2847-A', location: 'Top right corner' },
      { type: 'CODE_128', value: '9876543210123', location: 'Bottom shipping label' }
    ],
    textRecognition: [
      { key: 'PO_NUMBER', value: 'PO-5832', confidence: 0.98 },
      { key: 'LOT_CODE', value: 'LOT-2024-A123', confidence: 0.95 },
      { key: 'SHIP_DATE', value: '2024-10-26', confidence: 0.92 },
      { key: 'DESTINATION', value: 'New York, NY 10001', confidence: 0.89 }
    ],
    objectCounting: [
      { object: 'Pallet', count: 1 },
      { object: 'Box', count: 48 },
      { object: 'Individual Unit', count: 576 }
    ],
    damageAssessment: {
      detected: false,
      damageType: 'None',
      severity: 'NONE',
      location: 'N/A',
      recommendation: 'Package in excellent condition. Clear for shipment.'
    },
    complianceCheck: {
      hazmatDetected: false,
      requiredMarkingsPresent: true,
      violations: []
    },
    summary: 'Shipment SH-2847-A verified. 48 boxes on 1 pallet, all markings present, no damage detected. Ready for dispatch.',
    confidence: 0.94,
    timestamp: new Date().toISOString()
  },
  {
    barcodes: [
      { type: 'UPC', value: '012345678905', location: 'Product label' }
    ],
    textRecognition: [
      { key: 'BATCH_NUMBER', value: 'B-8472', confidence: 0.91 },
      { key: 'EXPIRY_DATE', value: '2025-06-15', confidence: 0.88 }
    ],
    objectCounting: [
      { object: 'Box', count: 12 }
    ],
    damageAssessment: {
      detected: true,
      damageType: 'Water Damage',
      severity: 'MODERATE',
      location: 'Bottom left corner, 3 boxes affected',
      recommendation: 'Quarantine affected units. Inspect contents. Consider repackaging if product integrity compromised.'
    },
    complianceCheck: {
      hazmatDetected: false,
      requiredMarkingsPresent: true,
      violations: []
    },
    summary: 'Water damage detected on 3 of 12 boxes. Moderate severity. Immediate inspection required before acceptance.',
    confidence: 0.87,
    timestamp: new Date().toISOString()
  }
];
