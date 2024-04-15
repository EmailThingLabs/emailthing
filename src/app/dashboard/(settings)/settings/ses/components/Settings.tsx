import { SettingsForm } from "./SettingsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SettingsComponent() {
  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>AWS Simple Email Service Configuration</CardTitle>
          <CardDescription>
            Enter your AWS SES credentials to setup email sending.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
