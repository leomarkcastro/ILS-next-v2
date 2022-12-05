const surveyQuestions = [
  {
    Question: 'I understand something better after I',
    A: 'try it out.',
    B: 'think it through.',
    Scale: 'Active - Reflective',
    Explanation: 'Action-first or reflection-first',
  },
  {
    Question: 'I would rather be considered',
    A: 'realistic.',
    B: 'innovative.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question:
      'When I think about what I did yesterday, I am most likely to get',
    A: 'a picture.',
    B: 'words.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format prefered for memory or recall',
  },
  {
    Question: 'I tend to',
    A: 'understand details of a subject but may be fuzzy about its overall structure.',
    B: 'understand the overall structure but may be fuzzy about details.',
    Scale: 'Sequential - Global',
    Explanation:
      'Emphasize details (the trees) or the big picture (the forest)',
  },
  {
    Question: 'When I am learning something new, it helps me to',
    A: 'talk about it.',
    B: 'think about it.',
    Scale: 'Active - Reflective',
    Explanation: 'Action-first or reflection-first',
  },
  {
    Question: 'If I were a teacher, I would rather teach a course',
    A: 'that deals with facts and real life situations.',
    B: 'that deals with ideas and theories.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'I prefer to get new information in',
    A: 'pictures, diagrams, graphs, or maps.',
    B: 'written directions or verbal information.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format preferred for input',
  },
  {
    Question: 'Once I understand',
    A: 'all the parts, I understand the whole thing.',
    B: 'the whole thing, I see how the parts fit.',
    Scale: 'Sequential - Global',
    Explanation: 'Linear/sequential or random/holistic thinking',
  },
  {
    Question:
      'In a study group working on difficult material, I am more likely to',
    A: 'jump in and contribute ideas.',
    B: 'sit back and listen.',
    Scale: 'Active - Reflective',
    Explanation: 'Outgoing or reserved',
  },
  {
    Question: 'I find it easier',
    A: 'to learn facts.',
    B: 'to learn concepts.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'In a book with lots of pictures and charts, I am likely to',
    A: 'look over the pictures and charts carefully.',
    B: 'focus on the written text.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format preferred for input',
  },
  {
    Question: 'When I solve math problems',
    A: 'I usually work my way to the solutions one step at a time.',
    B: 'I often just see the solutions but then have to struggle to figure out the steps to get to them.',
    Scale: 'Sequential - Global',
    Explanation: 'Linear/sequential or random/holistic thinking',
  },
  {
    Question: 'In classes I have taken',
    A: 'I have usually gotten to know many of the students.',
    B: 'I have rarely gotten to know many of the students.',
    Scale: 'Active - Reflective',
    Explanation: 'Outgoing or reserved',
  },
  {
    Question: 'In reading nonfiction, I prefer',
    A: 'something that teaches me new facts or tells me how to do something.',
    B: 'something that gives me new ideas to think about.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'I like teachers',
    A: 'who put a lot of diagrams on the board.',
    B: 'who spend a lot of time explaining.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format preferred for input',
  },
  {
    Question: "When I'm analyzing a story or a novel",
    A: 'I think of the incidents and try to put them together to figure out the themes.',
    B: 'I just know what the themes are when I finish reading and then I have to go back and find the incidents that demonstrate them.',
    Scale: 'Sequential - Global',
    Explanation:
      'Emphasize details (the trees) or the big picture (the forest)',
  },
  {
    Question: 'When I start a homework problem, I am more likely to',
    A: 'start working on the solution immediately.',
    B: 'try to fully understand the problem first.',
    Scale: 'Active - Reflective',
    Explanation: 'Action-first or reflection-first',
  },
  {
    Question: 'I prefer the idea of',
    A: 'certainty.',
    B: 'theory.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'I remember best',
    A: 'what I see.',
    B: 'what I hear.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format prefered for memory or recall',
  },
  {
    Question: 'It is more important to me that an instructor',
    A: 'lay out the material in clear sequential steps.',
    B: 'give me an overall picture and relate the material to other subjects.',
    Scale: 'Sequential - Global',
    Explanation: 'Linear/sequential or random/holistic thinking',
  },
  {
    Question: 'I prefer to study',
    A: 'in a study group.',
    B: 'alone.',
    Scale: 'Active - Reflective',
    Explanation: 'Favorable or unfavorable attitude toward group work',
  },
  {
    Question: 'I am more likely to be considered',
    A: 'careful about the details of my work.',
    B: 'creative about how to do my work.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'When I get directions to a new place, I prefer',
    A: 'a map.',
    B: 'written directions.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format preferred for input',
  },
  {
    Question: 'I learn',
    A: 'at a fairly regular pace. If I study hard, I\'ll "get it."',
    B: 'in fits and starts. I\'ll be totally confused and then suddenly it all "clicks."',
    Scale: 'Sequential - Global',
    Explanation: 'Linear/sequential or random/holistic thinking',
  },
  {
    Question: 'I would rather first',
    A: 'try things out.',
    B: "think about how I'm going to do it.",
    Scale: 'Active - Reflective',
    Explanation: 'Action-first or reflection-first',
  },
  {
    Question: 'When I am reading for enjoyment, I like writers to',
    A: 'clearly say what they mean.',
    B: 'say things in creative, interesting ways.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question:
      'When I see a diagram or sketch in class, I am most likely to remember',
    A: 'the picture.',
    B: 'what the instructor said about it.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format prefered for memory or recall',
  },
  {
    Question: 'When considering a body of information, I am more likely to',
    A: 'focus on details and miss the big picture.',
    B: 'try to understand the big picture before getting into the details.',
    Scale: 'Sequential - Global',
    Explanation:
      'Emphasize details (the trees) or the big picture (the forest)',
  },
  {
    Question: 'I more easily remember',
    A: 'something I have done.',
    B: 'something I have thought a lot about.',
    Scale: 'Active - Reflective',
    Explanation: 'Action-first or reflection-first',
  },
  {
    Question: 'When I have to perform a task, I prefer to',
    A: 'master one way of doing it.',
    B: 'come up with new ways of doing it.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'When someone is showing me data, I prefer',
    A: 'charts or graphs.',
    B: 'text summarizing the results.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format preferred for input',
  },
  {
    Question: 'When writing a paper, I am more likely to',
    A: 'work on (think about or write) the beginning of the paper and progress forward.',
    B: 'work on (think about or write) different parts of the paper and then order them.',
    Scale: 'Sequential - Global',
    Explanation: 'Linear/sequential or random/holistic thinking',
  },
  {
    Question: 'When I have to work on a group project, I first want to',
    A: 'have "group brainstorming" where everyone contributes ideas.',
    B: 'brainstorm individually and then come together as a group to compare ideas.',
    Scale: 'Active - Reflective',
    Explanation: 'Favorable or unfavorable attitude toward group work',
  },
  {
    Question: 'I consider it higher praise to call someone',
    A: 'sensible.',
    B: 'imaginative.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'When I meet people at a party, I am more likely to remember',
    A: 'what they looked like.',
    B: 'what they said about themselves.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format prefered for memory or recall',
  },
  {
    Question: 'When I am learning a new subject, I prefer to',
    A: 'stay focused on that subject, learning as much about it as I can.',
    B: 'try to make connections between that subject and related subjects.',
    Scale: 'Sequential - Global',
    Explanation: 'Linear/sequential or random/holistic thinking',
  },
  {
    Question: 'I am more likely to be considered',
    A: 'outgoing.',
    B: 'reserved.',
    Scale: 'Active - Reflective',
    Explanation: 'Outgoing or reserved',
  },
  {
    Question: 'I prefer courses that emphasize',
    A: 'concrete material (facts, data).',
    B: 'abstract material (concepts, theories).',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'For entertainment, I would rather',
    A: 'watch television.',
    B: 'read a book.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format prefered for memory or recall',
  },
  {
    Question:
      'Some teachers start their lectures with an outline of what they will cover. Such outlines are',
    A: 'somewhat helpful to me.',
    B: 'very helpful to me.',
    Scale: 'Sequential - Global',
    Explanation:
      'Emphasize details (the trees) or the big picture (the forest)',
  },
  {
    Question:
      'The idea of doing homework in groups, with one grade for the entire group,',
    A: 'appeals to me.',
    B: 'does not appeal to me.',
    Scale: 'Active - Reflective',
    Explanation: 'Favorable or unfavorable attitude toward group work',
  },
  {
    Question: 'When I am doing long calculations,',
    A: 'I tend to repeat all my steps and check my work carefully.',
    B: 'I find checking my work tiresome and have to force myself to do it.',
    Scale: 'Sensing - Intuitive',
    Explanation:
      'Preference for Concrete information (facts, data, the "real world") or abstraction (interpretations, theories, models)',
  },
  {
    Question: 'I tend to picture places I have been',
    A: 'easily and fairly accurately.',
    B: 'with difficulty and without much detail.',
    Scale: 'Visual - Verbal',
    Explanation: 'Information format prefered for memory or recall',
  },
  {
    Question: 'When solving problems in a group, I would be more likely to',
    A: 'think of the steps in the solutions process.',
    B: 'think of possible consequences or applications of the solution in a wide range of areas.',
    Scale: 'Sequential - Global',
    Explanation: 'Linear/sequential or random/holistic thinking',
  },
]

export default surveyQuestions
