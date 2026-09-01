import Cms from '../Model/cms.js';

// ==========================================
// PUBLIC ENDPOINTS (NO AUTH REQUIRED FOR THE FRONTEND WEBSITE)
// ==========================================

// @desc    Get data for a specific section (e.g., hero, about)
// @route   GET /api/cms/:sectionKey
export const getSection = async (req, res) => {
  const { sectionKey } = req.params;

  try {
    const section = await Cms.findOne({ where: { sectionKey } });
    
    if (!section) {
      // If the section doesn't exist yet, return an empty object to avoid crashes
      return res.status(200).json({});
    }

    // Returns just the core JSON shape data exactly as specified in API_CONTRACT.md
    return res.status(200).json(section.data);
  } catch (error) {
    return res.status(500).json({ 
      error: 'Server Error: ' + error.message, 
      code: 'INTERNAL_ERROR' 
    });
  }
};

// @desc    Bulk Content Sync: Get all sections combined for main page loads
// @route   GET /api/cms/all
export const getAllCms = async (req, res) => {
  try {
    const allItems = await Cms.findAll();
    
    // Reduces records array into a single mapped key-value object
    const formattedData = allItems.reduce((acc, item) => {
      acc[item.sectionKey] = item.data;
      return acc;
    }, {});

    return res.status(200).json(formattedData);
  } catch (error) {
    return res.status(500).json({ 
      error: 'Server Error: ' + error.message, 
      code: 'INTERNAL_ERROR' 
    });
  }
};


// ==========================================
// PROTECTED ENDPOINTS (SUPERADMIN-ONLY ACCESS RULES)
// ==========================================

// @desc    Update data for a single section
// @route   PUT /api/cms/:sectionKey
export const updateSection = async (req, res) => {
  const { sectionKey } = req.params;

  try {
    // Authority Enforcement: Block any account that is not explicitly a SuperAdmin
    if (req.user.role !== 'SuperAdmin') {
      return res.status(403).json({ 
        error: 'Forbidden: Only SuperAdmin accounts can alter CMS content panels', 
        code: 'FORBIDDEN' 
      });
    }

    // Upsert automatically inserts a new record or updates if sectionKey exists
    const [section] = await Cms.upsert({
      sectionKey,
      data: req.body,
    });

    return res.status(200).json(section.data);
  } catch (error) {
    return res.status(500).json({ 
      error: 'Server Error: ' + error.message, 
      code: 'INTERNAL_ERROR' 
    });
  }
};

// @desc    Bulk Content Sync: Overwrite or update multiple sections concurrently
// @route   PUT /api/cms/all
export const bulkUpdateCms = async (req, res) => {
  try {
    // Authority Enforcement: Block any account that is not explicitly a SuperAdmin
    if (req.user.role !== 'SuperAdmin') {
      return res.status(403).json({ 
        error: 'Forbidden: Only SuperAdmin accounts can alter CMS content panels', 
        code: 'FORBIDDEN' 
      });
    }

    const bulkData = req.body; 
    const keys = Object.keys(bulkData);

    // Run parallel upserts for each key in the incoming payload
    if (keys.length > 0) {
      await Promise.all(
        keys.map((key) =>
          Cms.upsert({
            sectionKey: key,
            data: bulkData[key],
          })
        )
      );
    }

    return res.status(200).json(bulkData);
  } catch (error) {
    return res.status(500).json({ 
      error: 'Server Error: ' + error.message, 
      code: 'INTERNAL_ERROR' 
    });
  }
};