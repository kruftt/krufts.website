import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function LinkBar() {
  return (
    <NavigationMenu className="m-6">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="text-xl text-gray-800!">Home</NavigationMenuLink>
        </NavigationMenuItem>
        &nbsp;•&nbsp;
        <NavigationMenuItem>
          <NavigationMenuLink href="/portfolio" className="text-xl text-gray-800!">Portfolio</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}