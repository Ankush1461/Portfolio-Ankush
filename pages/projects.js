import { Container,  Heading, SimpleGrid } from "@chakra-ui/react"
import {ProjectGridItem} from "../components/grid-item"
import ParticleBackground from "../components/ParticleBackground"
import Section from "../components/section"
import Layout from "../components/layouts/article";

import ThumbInsta from "../public/images/projects/instagram-next-2.png"
import ThumbUber from "../public/images/projects/uberclone.png"
const Projects = () => {
  return (
    <Layout>
      <Container>
        <ParticleBackground />
        <Heading as="h3" fontSize={20} mb={4}>
          Projects
        </Heading>
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            <ProjectGridItem
              id="instagramnext2"
              title="Instagram Next 2.0"
              thumbnail={ThumbInsta}
            >
              An Instagram clone where one can <b>post images</b>,{" "}
              <b>like posts</b> and
              <b>add comments</b>. Made with technologies like <b>ReactJS</b> ,{" "}
              <b>NextJS</b> , <b>Firebase v9</b> , <b>TailwindCSS</b>.
            </ProjectGridItem>
          </Section>
          <Section>
            <ProjectGridItem
              id="uberclone"
              title="Uber Clone"
              thumbnail={ThumbUber}
            >
              An Uber clone with <b>route-recognition</b> and{" "}
              <b>relative pricing model</b>. Made with technologies like{" "}
              <b>ReactJS</b> , <b>NextJS</b> , <b>Firebase v9</b> ,{" "}
              <b>TailwindCSS</b>.
            </ProjectGridItem>
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  );
}

export default Projects