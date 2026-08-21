import Traceability from '../Model/traceability.js';

// @desc    Get traceability pipeline for a specific brand (Public)
// @route   GET /api/traceability/:brandId
export const getTraceability = async (req, res) => {
  const brandId = Number(req.params.brandId);

  try {
    // Find the pipeline and sort the internal stages by their 'order' sequence
    let pipeline = await Traceability.findOne({ brandId });

    // If no pipeline exists yet, return an empty structure nicely instead of breaking
    if (!pipeline) {
      return res.status(200).json({
        success: true,
        data: { brandId, stages: [] }
      });
    }

    // Sort stages array by the sequential order number (1, 2, 3...)
    pipeline.stages.sort((a, b) => a.order - b.order);

    return res.status(200).json({
      success: true,
      data: pipeline
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};

// @desc    Update or Create traceability pipeline stages (Protected)
// @route   PUT /api/traceability/:brandId
export const updateTraceability = async (req, res) => {
  const brandId = Number(req.params.brandId);
  const { stages } = req.body; // Expecting an array of stages

  try {
    // Security Rule: BrandManager can only update their own brand's pipeline
    if (req.user.role === 'BrandManager' && req.user.brandId !== brandId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to manage this brand\'s tracking metrics' 
      });
    }

    // Find existing pipeline or create a new instance if it doesn't exist
    let pipeline = await Traceability.findOne({ brandId });

    if (!pipeline) {
      pipeline = new Traceability({ brandId, stages });
    } else {
      pipeline.stages = stages; // Overwrite old stages with the updated pipeline array
    }

    await pipeline.save();

    // Sort before sending back response
    pipeline.stages.sort((a, b) => a.order - b.order);

    return res.status(200).json({
      success: true,
      message: 'Traceability pipeline updated successfully',
      data: pipeline
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
  }
};