import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { TransactionForm } from "./TransactionForm";

export type TransactionFormDrawerProps = React.ComponentProps<typeof Drawer>;

export const TransactionFormDrawer = ({
  children,
  ...props
}: TransactionFormDrawerProps) => {
  return (
    <Drawer {...props} direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerClose className="absolute right-4 top-4">
          <Button variant="ghost" size="icon">
            <XIcon className="w-4 h-4 " />
          </Button>
        </DrawerClose>

        <TransactionForm />
      </DrawerContent>
    </Drawer>
  );
};
