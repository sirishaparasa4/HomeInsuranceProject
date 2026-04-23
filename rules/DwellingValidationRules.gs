package rules.validation

import gw.api.locale.DisplayKey

/**
 * Validation rules for the Dwelling entity in Home Insurance.
 */
@gw.rules.RuleName("Dwelling Validation Rules")
class DwellingValidationRules {

  static function validate(dwelling : Dwelling) {
    
    // 1. Check if Construction Type is selected
    if (dwelling.ConstructionType_Ext == null) {
      dwelling.reject("newloss", "Construction Type is required for the dwelling.", null, null)
    }

    // 2. Business Logic: If Home Type is 'Villa', Construction Type cannot be 'Apartment-style' (if applicable)
    if (dwelling.HomeType_Ext == typekey.HomeType.TC_VILLA and dwelling.ConstructionType_Ext == typekey.ConstructionType.TC_NON_COMBUSTIBLE) {
      dwelling.rejectField("ConstructionType_Ext", "newloss", "Villas typically require Frame or Masonry construction.", null, null)
    }

    // 3. Mandatory Security Check: Every home must have at least one security type (cannot be null)
    if (dwelling.SecurityType_Ext == null) {
      dwelling.reject("newloss", "Please specify a Security Type for the property.", null, null)
    }
  }
}