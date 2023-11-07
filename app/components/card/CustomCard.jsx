import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function CustomCard(props) {
  const { index, title, content } = props;

  return (
    <Card>
      <CardHeader>제목:{title}</CardHeader>
      <CardBody>내용:{content}</CardBody>
    </Card>
  );
}
