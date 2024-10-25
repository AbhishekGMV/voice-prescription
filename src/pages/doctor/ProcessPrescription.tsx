import logo from "../assets/logo.jpeg";
import rxLogo from "../assets/prescription-logo.png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../../components/ui/separator";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Alert } from "../../components/ui/alert";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
];

function ProcessPrescription() {
  function today() {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date());
  }
  return (
    <>
      <div className="container bg-white shadow-xl m-auto">
        <div className="doctor flex justify-between">
          <div>
            <h4 className="my-2 text-2xl text-blue-900 font-bold">Dr. Jon</h4>
            <div className="text-blue-800 font-bold">General</div>
            <div className="text-blue-600">9123132122</div>
          </div>
          <div>
            <img className="h-[100px] w-[200px]" src={logo} alt="logo" />
          </div>
        </div>
        <div className="patient flex my-4 justify-between">
          <div>
            <div>Patient: Ram</div>
            <div>Age: 24</div>
            <div>Phone: 9123132122</div>
          </div>
          <div className="text-lg">Date: {today()}</div>
        </div>
        <div>
          <Alert>Diagnosis: Fever</Alert>
        </div>
        <Table className="prescription-table my-4">
          <TableHeader>
            <TableRow>
              <TableHead>
                <img className="w-[50px]" src={rxLogo} alt="" />
              </TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className="my-4" />
        <AudioCommandInputFields />
        <div className="flex justify-between">
          <Button className="m-2">Add advice</Button>
          <div>
            <Button className="m-2 bg-blue-700">Sign</Button>
            <Button className="m-2 bg-green-700">Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}

const AudioCommandInputFields = () => {
  const fields = [
    {
      label: "Diagnosis",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
    {
      label: "Medicine",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
    {
      label: "Frequency",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
    {
      label: "Duration",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
    {
      label: "Dosage",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
  ];
  return (
    <>
      {fields.map((field) => {
        return (
          <div className="m-2">
            <Label>{field.label}</Label>
            <Input
              className="w-[30%] border-slate-400"
              onChange={field.onChange}
              onMouseEnter={field.onMouseEnter}
              onMouseLeave={field.onMouseLeave}
            />
          </div>
        );
      })}
    </>
  );
};

export default ProcessPrescription;
