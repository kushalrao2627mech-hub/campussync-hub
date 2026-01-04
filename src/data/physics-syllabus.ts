export interface SyllabusTopic {
  id: string;
  chapter: number;
  chapterName: string;
  topic: string;
  completed: boolean;
  assignmentUrl?: string;
}

export const PHYSICS_SYLLABUS: SyllabusTopic[] = [
  // Chapter 1: Electric Charges and Fields
  { id: '1-1', chapter: 1, chapterName: 'Electric Charges and Fields', topic: 'Electric Charges', completed: false, assignmentUrl: '/assignments/electric-charges.pdf' },
  { id: '1-2', chapter: 1, chapterName: 'Electric Charges and Fields', topic: 'Conductors and Insulators', completed: false, assignmentUrl: '/assignments/conductors-insulators.pdf' },
  { id: '1-3', chapter: 1, chapterName: 'Electric Charges and Fields', topic: "Coulomb's Law", completed: false, assignmentUrl: '/assignments/coulombs-law.pdf' },
  { id: '1-4', chapter: 1, chapterName: 'Electric Charges and Fields', topic: 'Electric Field', completed: false, assignmentUrl: '/assignments/electric-field.pdf' },
  { id: '1-5', chapter: 1, chapterName: 'Electric Charges and Fields', topic: 'Electric Field Lines', completed: false, assignmentUrl: '/assignments/field-lines.pdf' },
  { id: '1-6', chapter: 1, chapterName: 'Electric Charges and Fields', topic: 'Electric Dipole', completed: false, assignmentUrl: '/assignments/electric-dipole.pdf' },

  // Chapter 2: Electrostatic Potential and Capacitance
  { id: '2-1', chapter: 2, chapterName: 'Electrostatic Potential and Capacitance', topic: 'Electrostatic Potential', completed: false, assignmentUrl: '/assignments/electrostatic-potential.pdf' },
  { id: '2-2', chapter: 2, chapterName: 'Electrostatic Potential and Capacitance', topic: 'Potential due to Point Charge', completed: false, assignmentUrl: '/assignments/potential-point-charge.pdf' },
  { id: '2-3', chapter: 2, chapterName: 'Electrostatic Potential and Capacitance', topic: 'Equipotential Surfaces', completed: false, assignmentUrl: '/assignments/equipotential.pdf' },
  { id: '2-4', chapter: 2, chapterName: 'Electrostatic Potential and Capacitance', topic: 'Capacitors and Capacitance', completed: false, assignmentUrl: '/assignments/capacitors.pdf' },
  { id: '2-5', chapter: 2, chapterName: 'Electrostatic Potential and Capacitance', topic: 'Combination of Capacitors', completed: false, assignmentUrl: '/assignments/capacitor-combination.pdf' },

  // Chapter 3: Current Electricity
  { id: '3-1', chapter: 3, chapterName: 'Current Electricity', topic: 'Electric Current', completed: false, assignmentUrl: '/assignments/electric-current.pdf' },
  { id: '3-2', chapter: 3, chapterName: 'Current Electricity', topic: "Ohm's Law", completed: false, assignmentUrl: '/assignments/ohms-law.pdf' },
  { id: '3-3', chapter: 3, chapterName: 'Current Electricity', topic: 'Electrical Resistance', completed: false, assignmentUrl: '/assignments/resistance.pdf' },
  { id: '3-4', chapter: 3, chapterName: 'Current Electricity', topic: "Kirchhoff's Rules", completed: false, assignmentUrl: '/assignments/kirchhoffs-rules.pdf' },
  { id: '3-5', chapter: 3, chapterName: 'Current Electricity', topic: 'Wheatstone Bridge', completed: false, assignmentUrl: '/assignments/wheatstone-bridge.pdf' },

  // Chapter 4: Moving Charges and Magnetism
  { id: '4-1', chapter: 4, chapterName: 'Moving Charges and Magnetism', topic: 'Magnetic Force on Current', completed: false, assignmentUrl: '/assignments/magnetic-force.pdf' },
  { id: '4-2', chapter: 4, chapterName: 'Moving Charges and Magnetism', topic: 'Biot-Savart Law', completed: false, assignmentUrl: '/assignments/biot-savart.pdf' },
  { id: '4-3', chapter: 4, chapterName: 'Moving Charges and Magnetism', topic: "Ampere's Circuital Law", completed: false, assignmentUrl: '/assignments/amperes-law.pdf' },
  { id: '4-4', chapter: 4, chapterName: 'Moving Charges and Magnetism', topic: 'Force between Parallel Currents', completed: false, assignmentUrl: '/assignments/parallel-currents.pdf' },
  { id: '4-5', chapter: 4, chapterName: 'Moving Charges and Magnetism', topic: 'Moving Coil Galvanometer', completed: false, assignmentUrl: '/assignments/galvanometer.pdf' },

  // Chapter 5: Magnetism and Matter
  { id: '5-1', chapter: 5, chapterName: 'Magnetism and Matter', topic: 'Bar Magnet', completed: false, assignmentUrl: '/assignments/bar-magnet.pdf' },
  { id: '5-2', chapter: 5, chapterName: 'Magnetism and Matter', topic: 'Magnetic Field Lines', completed: false, assignmentUrl: '/assignments/magnetic-field-lines.pdf' },
  { id: '5-3', chapter: 5, chapterName: 'Magnetism and Matter', topic: "Earth's Magnetism", completed: false, assignmentUrl: '/assignments/earths-magnetism.pdf' },
  { id: '5-4', chapter: 5, chapterName: 'Magnetism and Matter', topic: 'Magnetic Properties of Materials', completed: false, assignmentUrl: '/assignments/magnetic-properties.pdf' },

  // Chapter 6: Electromagnetic Induction
  { id: '6-1', chapter: 6, chapterName: 'Electromagnetic Induction', topic: "Faraday's Law", completed: false, assignmentUrl: '/assignments/faradays-law.pdf' },
  { id: '6-2', chapter: 6, chapterName: 'Electromagnetic Induction', topic: "Lenz's Law", completed: false, assignmentUrl: '/assignments/lenzs-law.pdf' },
  { id: '6-3', chapter: 6, chapterName: 'Electromagnetic Induction', topic: 'Motional EMF', completed: false, assignmentUrl: '/assignments/motional-emf.pdf' },
  { id: '6-4', chapter: 6, chapterName: 'Electromagnetic Induction', topic: 'Inductance', completed: false, assignmentUrl: '/assignments/inductance.pdf' },
  { id: '6-5', chapter: 6, chapterName: 'Electromagnetic Induction', topic: 'AC Generator', completed: false, assignmentUrl: '/assignments/ac-generator.pdf' },

  // Chapter 7: Alternating Current
  { id: '7-1', chapter: 7, chapterName: 'Alternating Current', topic: 'AC Voltage in Resistor', completed: false, assignmentUrl: '/assignments/ac-resistor.pdf' },
  { id: '7-2', chapter: 7, chapterName: 'Alternating Current', topic: 'AC Voltage in Inductor', completed: false, assignmentUrl: '/assignments/ac-inductor.pdf' },
  { id: '7-3', chapter: 7, chapterName: 'Alternating Current', topic: 'AC Voltage in Capacitor', completed: false, assignmentUrl: '/assignments/ac-capacitor.pdf' },
  { id: '7-4', chapter: 7, chapterName: 'Alternating Current', topic: 'LCR Series Circuit', completed: false, assignmentUrl: '/assignments/lcr-circuit.pdf' },
  { id: '7-5', chapter: 7, chapterName: 'Alternating Current', topic: 'Transformers', completed: false, assignmentUrl: '/assignments/transformers.pdf' },

  // Chapter 8: Electromagnetic Waves
  { id: '8-1', chapter: 8, chapterName: 'Electromagnetic Waves', topic: 'Displacement Current', completed: false, assignmentUrl: '/assignments/displacement-current.pdf' },
  { id: '8-2', chapter: 8, chapterName: 'Electromagnetic Waves', topic: 'Electromagnetic Spectrum', completed: false, assignmentUrl: '/assignments/em-spectrum.pdf' },

  // Chapter 9: Ray Optics
  { id: '9-1', chapter: 9, chapterName: 'Ray Optics and Optical Instruments', topic: 'Reflection of Light', completed: false, assignmentUrl: '/assignments/reflection.pdf' },
  { id: '9-2', chapter: 9, chapterName: 'Ray Optics and Optical Instruments', topic: 'Refraction of Light', completed: false, assignmentUrl: '/assignments/refraction.pdf' },
  { id: '9-3', chapter: 9, chapterName: 'Ray Optics and Optical Instruments', topic: 'Total Internal Reflection', completed: false, assignmentUrl: '/assignments/tir.pdf' },
  { id: '9-4', chapter: 9, chapterName: 'Ray Optics and Optical Instruments', topic: 'Lenses', completed: false, assignmentUrl: '/assignments/lenses.pdf' },
  { id: '9-5', chapter: 9, chapterName: 'Ray Optics and Optical Instruments', topic: 'Optical Instruments', completed: false, assignmentUrl: '/assignments/optical-instruments.pdf' },

  // Chapter 10: Wave Optics
  { id: '10-1', chapter: 10, chapterName: 'Wave Optics', topic: "Huygens' Principle", completed: false, assignmentUrl: '/assignments/huygens.pdf' },
  { id: '10-2', chapter: 10, chapterName: 'Wave Optics', topic: 'Interference of Light', completed: false, assignmentUrl: '/assignments/interference.pdf' },
  { id: '10-3', chapter: 10, chapterName: 'Wave Optics', topic: 'Diffraction', completed: false, assignmentUrl: '/assignments/diffraction.pdf' },
  { id: '10-4', chapter: 10, chapterName: 'Wave Optics', topic: 'Polarisation', completed: false, assignmentUrl: '/assignments/polarisation.pdf' },

  // Chapter 11: Dual Nature of Radiation and Matter
  { id: '11-1', chapter: 11, chapterName: 'Dual Nature of Radiation and Matter', topic: 'Photoelectric Effect', completed: false, assignmentUrl: '/assignments/photoelectric.pdf' },
  { id: '11-2', chapter: 11, chapterName: 'Dual Nature of Radiation and Matter', topic: "Einstein's Photoelectric Equation", completed: false, assignmentUrl: '/assignments/einsteins-equation.pdf' },
  { id: '11-3', chapter: 11, chapterName: 'Dual Nature of Radiation and Matter', topic: 'Wave Nature of Matter', completed: false, assignmentUrl: '/assignments/wave-matter.pdf' },

  // Chapter 12: Atoms
  { id: '12-1', chapter: 12, chapterName: 'Atoms', topic: "Rutherford's Model", completed: false, assignmentUrl: '/assignments/rutherfords-model.pdf' },
  { id: '12-2', chapter: 12, chapterName: 'Atoms', topic: 'Atomic Spectra', completed: false, assignmentUrl: '/assignments/atomic-spectra.pdf' },
  { id: '12-3', chapter: 12, chapterName: 'Atoms', topic: "Bohr's Model", completed: false, assignmentUrl: '/assignments/bohrs-model.pdf' },

  // Chapter 13: Nuclei
  { id: '13-1', chapter: 13, chapterName: 'Nuclei', topic: 'Atomic Masses and Composition', completed: false, assignmentUrl: '/assignments/atomic-masses.pdf' },
  { id: '13-2', chapter: 13, chapterName: 'Nuclei', topic: 'Nuclear Binding Energy', completed: false, assignmentUrl: '/assignments/binding-energy.pdf' },
  { id: '13-3', chapter: 13, chapterName: 'Nuclei', topic: 'Radioactivity', completed: false, assignmentUrl: '/assignments/radioactivity.pdf' },
  { id: '13-4', chapter: 13, chapterName: 'Nuclei', topic: 'Nuclear Energy', completed: false, assignmentUrl: '/assignments/nuclear-energy.pdf' },

  // Chapter 14: Semiconductor Electronics
  { id: '14-1', chapter: 14, chapterName: 'Semiconductor Electronics', topic: 'Semiconductor Basics', completed: false, assignmentUrl: '/assignments/semiconductors.pdf' },
  { id: '14-2', chapter: 14, chapterName: 'Semiconductor Electronics', topic: 'p-n Junction', completed: false, assignmentUrl: '/assignments/pn-junction.pdf' },
  { id: '14-3', chapter: 14, chapterName: 'Semiconductor Electronics', topic: 'Junction Diode as Rectifier', completed: false, assignmentUrl: '/assignments/rectifier.pdf' },
  { id: '14-4', chapter: 14, chapterName: 'Semiconductor Electronics', topic: 'Zener Diode', completed: false, assignmentUrl: '/assignments/zener-diode.pdf' },
  { id: '14-5', chapter: 14, chapterName: 'Semiconductor Electronics', topic: 'Transistor', completed: false, assignmentUrl: '/assignments/transistor.pdf' },
  { id: '14-6', chapter: 14, chapterName: 'Semiconductor Electronics', topic: 'Logic Gates', completed: false, assignmentUrl: '/assignments/logic-gates.pdf' },
];

const SYLLABUS_STORAGE_KEY = 'campussync_physics_syllabus';

export function getSyllabus(): SyllabusTopic[] {
  const stored = localStorage.getItem(SYLLABUS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return PHYSICS_SYLLABUS;
    }
  }
  return PHYSICS_SYLLABUS;
}

export function updateTopicCompletion(topicId: string, completed: boolean): SyllabusTopic[] {
  const syllabus = getSyllabus();
  const updated = syllabus.map(topic => 
    topic.id === topicId ? { ...topic, completed } : topic
  );
  localStorage.setItem(SYLLABUS_STORAGE_KEY, JSON.stringify(updated));
  
  // Dispatch event for real-time updates
  window.dispatchEvent(new CustomEvent('syllabus-update', { 
    detail: { topicId, completed } 
  }));
  
  return updated;
}

export function getChapters(): { chapter: number; name: string; topics: SyllabusTopic[] }[] {
  const syllabus = getSyllabus();
  const chaptersMap = new Map<number, { name: string; topics: SyllabusTopic[] }>();
  
  syllabus.forEach(topic => {
    if (!chaptersMap.has(topic.chapter)) {
      chaptersMap.set(topic.chapter, { name: topic.chapterName, topics: [] });
    }
    chaptersMap.get(topic.chapter)!.topics.push(topic);
  });
  
  return Array.from(chaptersMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([chapter, data]) => ({ chapter, ...data }));
}
