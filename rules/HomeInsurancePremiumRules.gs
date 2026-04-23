package rules.rating

/**
 * Basic Rating Rules for Home Insurance Premium Calculation
 */
class PremiumRules {

  static function calculatePremium(dwelling : Dwelling) : double {
    var basePremium : double = 1000.0 // Starting base price
    var finalPremium = basePremium

    // 1. Logic based on Home Type
    switch (dwelling.HomeType_Ext) {
      case HomeType.TC_VILLA:
        finalPremium += 500 // Villas have higher coverage value
        break
      case HomeType.TC_APARTMENT:
        finalPremium -= 200 // Apartments usually have lower risk
        break
      case HomeType.TC_TOWNHOUSE:
        finalPremium += 100
        break
    }

    // 2. Logic based on Construction Type (Risk based)
    if (dwelling.ConstructionType_Ext == ConstructionType.TC_FRAME) {
      finalPremium *= 1.20 // 20% increase for wood frame (Fire risk)
    } else if (dwelling.ConstructionType_Ext == ConstructionType.TC_FIRE_RESISTIVE) {
      finalPremium *= 0.90 // 10% discount for fire-proof construction
    }

    // 3. Discounts for Security Systems
    if (dwelling.SecurityType_Ext == SecurityType.TC_CENTRAL_MONITORED) {
      finalPremium -= 150 // High discount for 24/7 monitoring
    } else if (dwelling.SecurityType_Ext == SecurityType.TC_SMOKE_ALARM) {
      finalPremium -= 50
    }

    return finalPremium
  }
}