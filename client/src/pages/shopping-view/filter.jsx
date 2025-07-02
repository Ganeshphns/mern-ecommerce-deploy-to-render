import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

function Productfliter({ filters, handleFilter }) {
   console.log(filters,  "filters 1");
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment  key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((Option) => (
                  <Label key={Option.id} className="flex  items-center gap-2 font-normal">
                    <Checkbox
                     checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(Option.id) > -1
                     }
                      onCheckedChange={() => handleFilter(keyItem, Option.id)}
                    />
                    {Option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Productfliter;
