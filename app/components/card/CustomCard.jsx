import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function CustomCard(props) {
  const data = props.data;
  const regDate = new Date(data.regDate);

  // 날짜를 직접 형식에 맞게 포맷
  const formattedDate = `${regDate.getFullYear()}.${String(
    regDate.getMonth() + 1
  ).padStart(2, "0")}.${String(regDate.getDate()).padStart(2, "0")} ${String(
    regDate.getHours()
  ).padStart(2, "0")}:${String(regDate.getMinutes()).padStart(2, "0")}`;

  // 날짜와 시간을 형식에 맞게 조합
  const formattedDateTime = formattedDate.replace(/[,]/g, ".");
  const finalFormattedDateTime = `${formattedDateTime}`;

  if (data.regDate == NaN) {
    data.regDate = "시간등록안됨";
  }
  return (
    <Card className="" radius="none" fullWidth={true}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{data.title}</h4>
      </CardHeader>
      <CardBody className="text-right">{finalFormattedDateTime}</CardBody>
    </Card>
  );
}
