import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <form action={login}>
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Icons.logo />
              </div>
              <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to continue your adaptability journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <p className="text-xs text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="font-medium text-primary hover:underline">
                  Sign Up
                </a>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  );
}
