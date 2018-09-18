import React from 'react';

import SPELLS from 'common/SPELLS';
import Analyzer from 'Parser/Core/Analyzer';
import SpellUsable from 'Parser/Core/Modules/SpellUsable';
import SpellIcon from 'common/SpellIcon';
import StatisticBox from 'Interface/Others/StatisticBox';
import { formatNumber } from 'common/format';
import STATISTIC_ORDER from 'Interface/Others/STATISTIC_ORDER';

const COOLDOWN_REDUCTION_MS = 3000;

/**
 * Casting Arcane Shot or Multi-Shot reduces the cooldown of Trueshot by 3.0 sec.
 *
 * Example log: https://www.warcraftlogs.com/reports/vXcAzCyFKrm4Jdw1#fight=3&type=damage-done&source=6
 */
class CallingTheShots extends Analyzer {
  static dependencies = {
    spellUsable: SpellUsable,
  };

  effectiveTrueshotReductionMs = 0;
  wastedTrueshotReductionMs = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.CALLING_THE_SHOTS_TALENT.id);
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (spellId !== SPELLS.ARCANE_SHOT.id && spellId !== SPELLS.MULTISHOT_MM.id) {
      return;
    }
    if (this.spellUsable.isOnCooldown(SPELLS.TRUESHOT.id)) {
      if (this.spellUsable.cooldownRemaining(SPELLS.TRUESHOT.id) < COOLDOWN_REDUCTION_MS) {
        const effectiveReductionMs = this.spellUsable.reduceCooldown(SPELLS.TRUESHOT.id, COOLDOWN_REDUCTION_MS);
        this.effectiveTrueshotReductionMs += effectiveReductionMs;
        this.wastedTrueshotReductionMs += (COOLDOWN_REDUCTION_MS - effectiveReductionMs);
      } else {
        this.effectiveTrueshotReductionMs += this.spellUsable.reduceCooldown(SPELLS.TRUESHOT.id, COOLDOWN_REDUCTION_MS);
      }
    } else {
      this.wastedTrueshotReductionMs += COOLDOWN_REDUCTION_MS;
    }
  }

  averageEffectiveCDR() {
    return (this.effectiveTrueshotReductionMs / ((this.wastedTrueshotReductionMs + this.effectiveTrueshotReductionMs) / (COOLDOWN_REDUCTION_MS / 1000)));
  }
  statistic() {
    return (
      <StatisticBox
        position={STATISTIC_ORDER.CORE(15)}
        icon={<SpellIcon id={SPELLS.CALLING_THE_SHOTS_TALENT.id} />}
        value={`${formatNumber(this.effectiveTrueshotReductionMs / 1000)}s`}
        label="Trueshot CDR"
        tooltip={`You wasted ${formatNumber(this.wastedTrueshotReductionMs / 1000)} seconds of CDR by using Arcane Shot or Multi Shot when Trueshot wasn't on cooldown or had less than 3 seconds remaning on CD.`} />
    );
  }
}

export default CallingTheShots;
