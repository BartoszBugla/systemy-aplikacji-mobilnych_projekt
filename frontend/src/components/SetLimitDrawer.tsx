import { XIcon } from "lucide-react";
import { type JSX } from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";

export type SetLimitDrawerProps = React.ComponentProps<typeof Drawer> & {
  CustomComponent?: JSX.Element;
};

export const SetLimitDrawer = ({
  children,
  CustomComponent,
  ...props
}: SetLimitDrawerProps) => {
  return (
    <Drawer {...props} direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerClose className="absolute right-4 top-4">
          <Button variant="ghost" size="icon">
            <XIcon className="w-4 h-4 " />
          </Button>
        </DrawerClose>

        {CustomComponent}
      </DrawerContent>
    </Drawer>
  );
};
