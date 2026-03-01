import { Spinner } from "@heroui/react";

export default function Spinners({lable}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-centerm backdrop-blur-sm">
      <Spinner classNames={{label: "text-foreground mt-4"}} color="primary" label={lable} variant="simple" />
    </div>
  )
}
