import { BookPage } from '../types';

export const bookPages: Record<string, BookPage[]> = {
  '7': [
    {
      id: '7-1',
      pageNumber: 1,
      content: `<h1 class="text-center mb-8 font-serif text-3xl">Echoes of the Forgotten</h1>
      <p>The package arrived on a moonless night.</p>
      <p>Dr. Sarah Chen stood in her dimly lit study, examining the weathered wooden crate that had appeared on her doorstep. No return address, no shipping label—just her name carved into the aged wood with unsettling precision.</p>
      <p>Twenty years as a paranormal investigator had taught her to trust her instincts, and right now, every nerve in her body was screaming that something was wrong. The air in her study felt thick, almost electric, and the shadows in the corners seemed to pulse with an unnatural rhythm.</p>
      <p>"Just another package," she whispered to herself, but the words felt hollow in the oppressive silence of her Victorian home.</p>`,
      images: [
        {
          url: 'https://images.pexels.com/photos/3391932/pexels-photo-3391932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          position: 'background'
        }
      ]
    },
    {
      id: '7-2',
      pageNumber: 2,
      content: `<p>With trembling fingers, she pried open the crate's lid. The hinges creaked in protest, releasing a musty odor that carried hints of decay and something else—something ancient and wrong.</p>
      <p>Inside, nestled in yellowed newspaper dated 1873, lay an ornate mirror. Its silver frame was adorned with intricate carvings of twisted faces, their expressions frozen in eternal agony. The glass itself was clouded with age, but as Sarah leaned closer, she could have sworn she saw movement in its depths.</p>
      <p>A note, written in faded brown ink on crumbling parchment, lay beside it:</p>
      <blockquote class="my-6 border-l-4 border-gray-300 pl-4 italic">
        "To the esteemed Dr. Chen,<br>
        What you hold is the Blackwood Mirror. For 150 years, it has claimed the souls of those who dare to look too deeply into its surface. I am its last guardian, and now, as death approaches, I pass this burden to you.<br>
        Find the others before it's too late.<br>
        - M.W."
      </blockquote>`,
      images: [
        {
          url: 'https://images.pexels.com/photos/3391937/pexels-photo-3391937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          position: 'right'
        }
      ]
    },
    {
      id: '7-3',
      pageNumber: 3,
      content: `<p>Sarah's heart pounded against her ribs as she processed the implications. The Blackwood Mirror was supposed to be a myth, a cautionary tale whispered among paranormal researchers. According to legend, it was created by a grief-stricken artificer who tried to bridge the gap between the world of the living and the dead.</p>
      <p>A sudden gust of wind extinguished the candles in her study, plunging the room into darkness save for the pale moonlight filtering through the windows. In that moment, Sarah realized the mirror was glowing.</p>
      <p>Faint whispers filled the air, unintelligible yet desperate. The temperature in the room plummeted, and Sarah's breath came out in visible puffs. As she watched, horrified, a hand—pale and ethereal—pressed against the other side of the glass.</p>
      <p>"Oh God," she breathed, stumbling backward. But she couldn't tear her eyes away from the mirror as more hands joined the first, pressing, clawing, trying to break through...</p>`,
      images: [
        {
          url: 'https://images.pexels.com/photos/3391934/pexels-photo-3391934.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          position: 'center'
        }
      ]
    }
  ]
};

export const getBookPages = (bookId: string): BookPage[] => {
  return bookPages[bookId] || [];
};