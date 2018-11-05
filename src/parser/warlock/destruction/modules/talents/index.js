import React from 'react';

import Analyzer from 'parser/core/Analyzer';

import StatisticsListBox from 'interface/others/StatisticsListBox';

import Flashover from './Flashover';
import ReverseEntropy from './ReverseEntropy';
import SoulFire from './SoulFire';
import InternalCombustion from './InternalCombustion';
import Shadowburn from './Shadowburn';
import ChannelDemonfire from './ChannelDemonfire';
import Inferno from './Inferno';
import FireAndBrimstone from './FireAndBrimstone';
import Cataclysm from './Cataclysm';
import SoulConduit from './SoulConduit';
import RoaringBlaze from './RoaringBlaze';
import GrimoireOfSupremacy from './GrimoireOfSupremacy';

class TalentStatisticBox extends Analyzer {
  static dependencies = {
    flashover: Flashover,
    reverseEntropy: ReverseEntropy,
    inferno: Inferno,
    soulFire: SoulFire,
    internalCombustion: InternalCombustion,
    shadowburn: Shadowburn,
    fireAndBrimstone: FireAndBrimstone,
    grimoireOfSupremacy: GrimoireOfSupremacy,
    cataclysm: Cataclysm,
    channelDemonfire: ChannelDemonfire,
    soulConduit: SoulConduit,
    roaringBlaze: RoaringBlaze,
  };

  constructor(...args) {
    super(...args);
    this.active = Object.keys(this.constructor.dependencies)
      .map(name => this[name].active)
      .includes(true);
  }

  statistic() {
    return (
      <StatisticsListBox title="Talents">
        {
          Object.keys(this.constructor.dependencies)
            .map(name => this[name])
            .filter(module => module.active)
            .map(module => module.subStatistic())
        }
      </StatisticsListBox>
    );
  }
}

export default TalentStatisticBox;