import Container from "@/components/ui/layout/Container";
import Content from "@/components/ui/layout/Content";
import { Title } from "@/components/ui/layout/Title";
import Tabs from "./components/Tabs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Title title="Setup" />
      <Content>
        <Tabs />
        {children}
      </Content>
    </Container>
  );
}
