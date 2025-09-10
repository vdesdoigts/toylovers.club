import {
  ArticleBlockquote,
  ArticleBody,
  ArticleHeader,
  ArticleMediasGrid,
  ArticleMediasShowcase,
  ArticleSwiper,
  ArticleVideo,
} from "@/components";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// Mock data for the interview article
const sampleSlides = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop",
    title: "Modern Architecture",
    description:
      "A stunning example of contemporary architectural design featuring clean lines and innovative materials.",
    alt: "Modern building with glass facade",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop",
    title: "Urban Landscape",
    description:
      "The dynamic interplay between urban development and natural elements in modern city planning.",
    alt: "City skyline with green spaces",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&h=500&fit=crop",
    title: "Minimalist Interior",
    description:
      "Exploring the beauty of simplicity through carefully curated spaces and thoughtful design.",
    alt: "Minimalist living room interior",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=900&fit=crop",
    title: "Architectural Details",
    description:
      "The intricate details that define exceptional architectural craftsmanship and attention to design.",
    alt: "Detailed view of architectural elements",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
    title: "Sustainable Design",
    description:
      "How modern architecture embraces sustainability while maintaining aesthetic excellence.",
    alt: "Green building with sustainable features",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=700&fit=crop",
    title: "Creative Spaces",
    description:
      "Innovative approaches to creating functional yet inspiring work and living environments.",
    alt: "Creative office space design",
  },
];

const showcaseImages = [
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop",
    alt: "Photography equipment setup 1",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800&fit=crop",
    alt: "Photography equipment setup 2",
  },
  {
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop",
    alt: "Photography equipment setup 3",
  },
];

const gridImages = [
  {
    src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=200&fit=crop",
    alt: "Behind the scenes setup 1",
  },
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
    alt: "Behind the scenes setup 2",
  },
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=200&fit=crop",
    alt: "Behind the scenes setup 3",
  },
  {
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop",
    alt: "Behind the scenes setup 4",
  },
  {
    src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=300&h=200&fit=crop",
    alt: "Behind the scenes setup 5",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop",
    alt: "Behind the scenes setup 6",
  },
];

const meta: Meta = {
  title: "Pages/Article Page",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A complete article page layout demonstrating the composition of all article components. This story shows how ArticleHeader, ArticleSwiper, ArticleBody, ArticleBlockquote, ArticleMediasShowcase, ArticleMediasGrid, and ArticleVideo work together to create a comprehensive interview-style article page.",
      },
    },
  },
  tags: ["autodocs"],
  render: (args) => (
    <article className="c-article min-h-screen bg-white py-12">
      {args.children}
    </article>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

// Complete interview article page
export const Interview: Story = {
  render: () => (
    <article className="c-article min-h-screen bg-white py-12">
      <ArticleHeader
        title="Sean Kenary"
        description={
          <p>
            Sean Kenary is a passionate toy collector and talented photographer.
            With a keen eye for detail and storytelling, Sean brings toys to
            life in imaginative ways that resonate with fans of all ages. You
            can explore more of his photography and follow his latest creations
            on Instagram at{" "}
            <a
              href="https://www.instagram.com/visual_approach_photo/?hl=en"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Visual Approach Photo
            </a>
            .
          </p>
        }
      />

      <ArticleSwiper slides={sampleSlides} />

      <ArticleBody>
        <h2 className="text-4xl font-sans mb-5">
          Hi Sean, what led you into toy photography?
        </h2>

        <p className="mb-3">
          I&rsquo;ve always enjoyed being creative. I worked as an airbrush
          artist about 20 years ago, fresh out of high school, and I enjoy
          drawing and painting in other mediums as well. I also like collecting
          toys and comics.
        </p>

        <p className="mb-3">
          I was looking for a creative way to enjoy my toy collection as an
          adult when I came across some toy photographers on Instagram—and I
          knew I had to try it out. I started with my phone, then graduated to
          my first DSLR, and the obsession just grew from there.
        </p>
      </ArticleBody>

      <ArticleBlockquote
        quote="I&rsquo;m the kind of person who dives deep into any subject I&rsquo;m passionate about—I love learning as much as I can and seeing how far I can take it. What really drives me is the challenge of growing: becoming a better storyteller, a more skilled diorama maker, and a stronger photographer with every project."
        author="Sean Kenary"
      />

      <ArticleBody>
        <h2 className="text-4xl font-sans mt-15 mb-5">
          Could you share details about the gear and equipment behind your
          setup?
        </h2>

        <p className="mb-3">
          Currently, I shoot with a Canon T7i paired with a Sigma 50mm macro
          lens. For lighting, I use two LumeCube Airs and a pair of small
          Aputure LED panels, along with a softbox lighting kit I scored on
          Groupon. I also work with various modifiers—bounce cards, barn doors,
          snoots, and V-flats—to shape and control the light. And when I want to
          add a little extra atmosphere, I fire up the fog machine.
        </p>
      </ArticleBody>

      <ArticleMediasShowcase images={showcaseImages} />

      <ArticleBody>
        <h2 className="text-4xl font-sans mt-15 mb-5">
          What does a typical photo shooting look like?
        </h2>

        <p className="mb-3">
          My photo shoots often begin long before I pick up my camera—sometimes
          while I&rsquo;m at work or even driving, an idea for a shot will
          suddenly come to me. I make sure to write it down then I spend some
          time brainstorming and refining the idea, thinking through the details
          and how I want to bring it to life.
        </p>

        <p className="mb-3">
          Once I have a solid concept, I head to my garage and I start building
          the scene, using one of the many diorama pieces I&rsquo;ve crafted
          over time. I always begin with the environment, setting the stage to
          match my vision. Before putting the figures into the scene, I pose
          them carefully at a table, making sure everything from their stances
          to their expressions fits the story I want to tell.
        </p>

        <p className="mb-3">
          I make adjustments as I look at the setup through the camera to make
          sure I&rsquo;m capturing the idea the way I envisioned and then I
          start snapping!
        </p>
      </ArticleBody>

      <ArticleSwiper slides={sampleSlides} />

      <ArticleBody>
        <h2 className="text-4xl font-sans mb-5">
          What would you say to someone new to toy photography?
        </h2>

        <p className="mb-3">
          The best advice I can give is some of the first advice I heard
          regarding this amazing hobby. Be a good photographer who takes
          pictures of toys. No amount of post work can rescue a bad picture.
        </p>

        <p className="mb-3">
          Learn about light and photography and how to take great photos and
          then apply that to toys. And take it slow, find your voice and style
          and hone in on the stories you want to tell. Most of all, have fun. It
          can be stressful but you have to keep it fun.
        </p>
      </ArticleBody>

      <ArticleBody>
        <h2 className="text-4xl font-sans mb-5">
          Who is your favorite toy photographer at the moment, or the one who
          inspires you the most?
        </h2>

        <p className="mb-3">
          I am really inspired by Trevor Williams. He demonstrates incredible
          skill in both lighting and framing, constantly setting a high standard
          for visual storytelling. What makes his work even more impressive is
          his willingness to openly share his setups and techniques with others.
          Through his detailed breakdowns and behind-the-scenes insights,
          I&rsquo;ve learned a great deal and have been able to improve my own
          approach. His openness and mastery have truly influenced my
          development as a photographer.
        </p>
      </ArticleBody>

      <ArticleMediasGrid images={gridImages} />

      <ArticleBody>
        <h2 className="text-4xl font-sans mb-5">
          Finally, If you had to keep only one toy, which one would you choose?
        </h2>

        <p className="mb-3">
          If I had to choose just one collectible to keep, it would definitely
          be the HasLab Sail Barge. Supporting that project was an incredible
          experience, and being part of the community that helped bring it to
          life felt very special. Beyond its impressive design and detail, the
          Sail Barge holds extra meaning for me because Return of the Jedi is my
          favorite Star Wars movie.
        </p>
      </ArticleBody>

      <ArticleVideo src="/video-demo.mp4" caption="The Barge from HasLab" />
    </article>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete interview article page showcasing all article components working together. This demonstrates the typical structure of a long-form interview article with header, image galleries, text content, quotes, media showcases, and video content.",
      },
    },
  },
};
