import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function CustomCard(props) {
  const { index, title, content } = props;
  return (
    <Card className="" radius="none" fullWidth={true}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody>내용:{content}</CardBody>
    </Card>
  );
}
