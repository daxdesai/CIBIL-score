"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppHeader } from "@/components/layout/AppShell";
import { MaskedValue } from "@/components/shared/MaskedValue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  profileEditSchema,
  type ProfileEditFormValues,
} from "@/lib/validations/auth";
import { maskMobile, maskPan } from "@/lib/masking";
import { useAuth } from "@/providers/auth-provider";

export default function ProfilePage() {
  const { customer, updateCustomer } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState<ProfileEditFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      email: customer.email,
      address: customer.address,
      pinCode: customer.pinCode,
    },
  });

  const onSubmit = (values: ProfileEditFormValues) => {
    setPending(values);
    setConfirmOpen(true);
  };

  const confirmSave = () => {
    if (pending) {
      updateCustomer(pending);
    }
    setConfirmOpen(false);
    setPending(null);
  };

  return (
    <>
      <AppHeader title="Profile" description="View and update your contact information." />
      <div className="flex-1 p-4 sm:p-6">
        <div className="mx-auto grid max-w-3xl gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
              <p>
                <span className="text-muted-foreground">Name: </span>
                {customer.fullName}
              </p>
              <p>
                <span className="text-muted-foreground">PAN: </span>
                <MaskedValue value={maskPan(customer.pan)} />
              </p>
              <p>
                <span className="text-muted-foreground">Mobile: </span>
                <MaskedValue value={maskMobile(customer.mobile)} />
              </p>
              <p>
                <span className="text-muted-foreground">Date of birth: </span>
                {customer.dateOfBirth}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Editable details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email ? (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" rows={3} {...register("address")} />
                  {errors.address ? (
                    <p className="text-sm text-destructive">{errors.address.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pinCode">PIN code</Label>
                  <Input id="pinCode" maxLength={6} {...register("pinCode")} />
                  {errors.pinCode ? (
                    <p className="text-sm text-destructive">{errors.pinCode.message}</p>
                  ) : null}
                </div>
                <Button type="submit" disabled={!isDirty}>
                  Save changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm changes</DialogTitle>
            <DialogDescription>
              Updating your contact details may require verification on a live banking
              platform. Continue with this demo update?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSave}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
