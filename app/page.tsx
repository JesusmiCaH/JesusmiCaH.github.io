'use client';

import { useState } from 'react';
import { Urbanview } from '@/components/urbanview/urbanview';
import { portraitOrder } from '@/content/site';

export default function Home() {
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [lifeExpanded, setLifeExpanded] = useState(false);
  return <Urbanview portraitId={portraitOrder[portraitIndex]} onCyclePortrait={() => setPortraitIndex((index) => (index + 1) % portraitOrder.length)} lifeExpanded={lifeExpanded} onToggleLife={() => setLifeExpanded((expanded) => !expanded)} />;
}
