/**
 * v0 by Vercel.
 * @see https://v0.dev/t/789y1u9BavF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { AreaChart, CartesianGrid, XAxis, Area } from "recharts";

export default function BarChart() {
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    Income: {
      label: "Income",
      color: "#fa5",
    },
    expense: {
      label: "expense",
      color: "#fc4",
    },
  };
  const chartData = [
    { date: "2024-04-01", Income: 222, expense: 150 },
    { date: "2024-04-02", Income: 97, expense: 180 },
    { date: "2024-04-03", Income: 167, expense: 120 },
    { date: "2024-04-04", Income: 242, expense: 260 },
    { date: "2024-04-05", Income: 373, expense: 290 },
    { date: "2024-04-06", Income: 301, expense: 340 },
    { date: "2024-04-07", Income: 245, expense: 180 },
    { date: "2024-04-08", Income: 409, expense: 320 },
    { date: "2024-04-09", Income: 59, expense: 110 },
    { date: "2024-04-10", Income: 261, expense: 190 },
    { date: "2024-04-11", Income: 327, expense: 350 },
    { date: "2024-04-12", Income: 292, expense: 210 },
    { date: "2024-04-13", Income: 342, expense: 380 },
    { date: "2024-04-14", Income: 137, expense: 220 },
    { date: "2024-04-15", Income: 120, expense: 170 },
    { date: "2024-04-16", Income: 138, expense: 190 },
    { date: "2024-04-17", Income: 446, expense: 360 },
    { date: "2024-04-18", Income: 364, expense: 410 },
    { date: "2024-04-19", Income: 243, expense: 180 },
    { date: "2024-04-20", Income: 89, expense: 150 },
    { date: "2024-04-21", Income: 137, expense: 200 },
    { date: "2024-04-22", Income: 224, expense: 170 },
    { date: "2024-04-23", Income: 138, expense: 230 },
    { date: "2024-04-24", Income: 387, expense: 290 },
    { date: "2024-04-25", Income: 215, expense: 250 },
    { date: "2024-04-26", Income: 75, expense: 130 },
    { date: "2024-04-27", Income: 383, expense: 420 },
    { date: "2024-04-28", Income: 122, expense: 180 },
    { date: "2024-04-29", Income: 315, expense: 240 },
    { date: "2024-04-30", Income: 454, expense: 380 },
    { date: "2024-05-01", Income: 165, expense: 220 },
    { date: "2024-05-02", Income: 293, expense: 310 },
    { date: "2024-05-03", Income: 247, expense: 190 },
    { date: "2024-05-04", Income: 385, expense: 420 },
    { date: "2024-05-05", Income: 481, expense: 390 },
    { date: "2024-05-06", Income: 498, expense: 520 },
    { date: "2024-05-07", Income: 388, expense: 300 },
    { date: "2024-05-08", Income: 149, expense: 210 },
    { date: "2024-05-09", Income: 227, expense: 180 },
    { date: "2024-05-10", Income: 293, expense: 330 },
    { date: "2024-05-11", Income: 335, expense: 270 },
    { date: "2024-05-12", Income: 197, expense: 240 },
    { date: "2024-05-13", Income: 197, expense: 160 },
    { date: "2024-05-14", Income: 448, expense: 490 },
    { date: "2024-05-15", Income: 473, expense: 380 },
    { date: "2024-05-16", Income: 338, expense: 400 },
    { date: "2024-05-17", Income: 499, expense: 420 },
    { date: "2024-05-18", Income: 315, expense: 350 },
    { date: "2024-05-19", Income: 235, expense: 180 },
    { date: "2024-05-20", Income: 177, expense: 230 },
    { date: "2024-05-21", Income: 82, expense: 140 },
    { date: "2024-05-22", Income: 81, expense: 120 },
    { date: "2024-05-23", Income: 252, expense: 290 },
    { date: "2024-05-24", Income: 294, expense: 220 },
    { date: "2024-05-25", Income: 201, expense: 250 },
    { date: "2024-05-26", Income: 213, expense: 170 },
    { date: "2024-05-27", Income: 420, expense: 460 },
    { date: "2024-05-28", Income: 233, expense: 190 },
    { date: "2024-05-29", Income: 78, expense: 130 },
    { date: "2024-05-30", Income: 340, expense: 280 },
    { date: "2024-05-31", Income: 178, expense: 230 },
    { date: "2024-06-01", Income: 178, expense: 200 },
    { date: "2024-06-02", Income: 470, expense: 410 },
    { date: "2024-06-03", Income: 103, expense: 160 },
    { date: "2024-06-04", Income: 439, expense: 380 },
    { date: "2024-06-05", Income: 88, expense: 140 },
    { date: "2024-06-06", Income: 294, expense: 250 },
    { date: "2024-06-07", Income: 323, expense: 370 },
    { date: "2024-06-08", Income: 385, expense: 320 },
    { date: "2024-06-09", Income: 438, expense: 480 },
    { date: "2024-06-10", Income: 155, expense: 200 },
    { date: "2024-06-11", Income: 92, expense: 150 },
    { date: "2024-06-12", Income: 492, expense: 420 },
    { date: "2024-06-13", Income: 81, expense: 130 },
    { date: "2024-06-14", Income: 426, expense: 380 },
    { date: "2024-06-15", Income: 307, expense: 350 },
    { date: "2024-06-16", Income: 371, expense: 310 },
    { date: "2024-06-17", Income: 475, expense: 520 },
    { date: "2024-06-18", Income: 107, expense: 170 },
    { date: "2024-06-19", Income: 341, expense: 290 },
    { date: "2024-06-20", Income: 408, expense: 450 },
    { date: "2024-06-21", Income: 169, expense: 210 },
    { date: "2024-06-22", Income: 317, expense: 270 },
    { date: "2024-06-23", Income: 480, expense: 530 },
    { date: "2024-06-24", Income: 132, expense: 180 },
    { date: "2024-06-25", Income: 141, expense: 190 },
    { date: "2024-06-26", Income: 434, expense: 380 },
    { date: "2024-06-27", Income: 448, expense: 490 },
    { date: "2024-06-28", Income: 149, expense: 200 },
    { date: "2024-06-29", Income: 103, expense: 160 },
    { date: "2024-06-30", Income: 446, expense: 400 },
  ];
  const [timeRange, setTimeRange] = React.useState("90d");
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  console.log(filteredData);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Income)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Income)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillexpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillexpense)"
              stroke="var(--color-expense)"
              stackId="a"
            />
            <Area
              dataKey="Income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-Income)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
