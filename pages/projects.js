import { Container, Heading, SimpleGrid, Link } from "@chakra-ui/react";
import { ProjectGridItem } from "../components/grid-item";
import Section from "../components/section";
import Layout from "../components/layouts/article";
import ParticleBackground from "./../components/ParticleBackground";
import ThumbInsta from "../public/images/projects/instagram-next-2.png";
import ThumbPort from "../public/images/projects/portfolio.png";
import ThumbGPT from "../public/images/projects/nextgpt_thumbnail.png";
const Projects = () => {
  return (
    <Layout>
      <ParticleBackground />
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Projects
        </Heading>
        <SimpleGrid columns={[1, 1, 1]} gap={6}>
          <Section>
            <Link href="https://instagram-next-2.vercel.app" target="_blank">
              <ProjectGridItem
                title="Instagram 2.0 Website"
                thumbnail={ThumbInsta}
              >
                An Instagram 2.0 social media clone, where one can{" "}
                <b>post images</b>, <b>like posts</b> and <b>comment</b>. Made
                with technologies like <b>ReactJS</b> , <b>NextJS</b> ,{" "}
                <b>Firebase V9</b> , <b>TailwindCSS</b>.
              </ProjectGridItem>
            </Link>
          </Section>
          <Section>
            <Link href="https://portfolio-ankush.vercel.app" target="_blank">
              <ProjectGridItem title="Portfolio Website" thumbnail={ThumbPort}>
                A Portfolio Website. Made with technologies like <b>ReactJS</b>,
                <br />
                <b>NextJS</b> , <b>Chakra UI</b> , <b>TailwindCSS</b>.
              </ProjectGridItem>
            </Link>
          </Section>
          <Section>
            <Link
              href="https://nextgpt-nine.vercel.app"
              target="_blank"
            >
              <ProjectGridItem title="NextGPT" thumbnail={ThumbGPT}>
                An AI tool to <b>play with</b> and{" "}
                <b>ask for descriptive text answers</b>. Made with technologies like{" "}
                <b>ReactJS</b> , <b>NextJS</b> , <b>OpenAI API</b> ,{" "}
                <b>Bootstrap</b>.
              </ProjectGridItem>
            </Link>
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default Projects;
