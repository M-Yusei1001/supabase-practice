import React from "react";
import { Button } from "@nextui-org/react";
import { RangeCalendar } from "@nextui-org/react";

function Page() {
  return (
    <div className="container mx-auto">
      <div className="p-4">
        <Button color="primary" variant="shadow" radius="full">
          Normal
        </Button>
      </div>
      <div className="p-4">
        <Button isDisabled color="primary">
          Normal
        </Button>
      </div>
      <div className="p-4">
        <Button
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
        >
          Normal
        </Button>
      </div>
    </div>
  );
}

export default Page;
