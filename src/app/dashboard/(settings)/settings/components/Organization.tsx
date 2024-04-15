import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Organization() {
  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Organization Configuration</CardTitle>
          <CardDescription>
            Organiaztion settings and configurations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Todo</p>
        </CardContent>
      </Card>
    </div>
  );
}
