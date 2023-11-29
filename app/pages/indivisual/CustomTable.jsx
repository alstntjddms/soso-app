import { useState } from "react";

import { Button, Input } from "@nextui-org/react";

export default function CustomTable() {
  const [email, setEmail] = useState("");

  const handleAddMember = () => {
    console.log(email);
  };

  return (
    <div>
      <Input
        autoFocus
        label="이메일"
        placeholder="이메일을 입력하세요."
        variant="bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button onClick={handleAddMember} />
    </div>
  );
}
