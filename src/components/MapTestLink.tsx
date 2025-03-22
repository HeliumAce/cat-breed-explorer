
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Map } from "lucide-react";

export function MapTestLink() {
  return (
    <Link to="/map-test">
      <Card className="hover:bg-amber-50 transition-colors">
        <CardContent className="p-4 flex items-center space-x-2">
          <Map className="h-5 w-5 text-amber-600" />
          <span>Test Google Maps API</span>
        </CardContent>
      </Card>
    </Link>
  );
}
