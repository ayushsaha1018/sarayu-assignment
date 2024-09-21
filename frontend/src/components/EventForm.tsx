import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Event, EventForm as EventFormType } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "./DatePicker";

interface EventFormProps {
  event: Event | null;
  date: Date;
  onSubmit: (event: EventFormType) => void;
  onCancel: () => void;
}

export function EventForm({ event, date, onSubmit, onCancel }: EventFormProps) {
  const { handleSubmit, control, register } = useForm<EventFormType>({
    defaultValues: {
      title: event?.title || "",
      date: event?.date || date,
      description: event?.description || "",
      reminder: event?.reminder || false,
      reminderTime: event?.reminderTime || "15",
    },
  });

  const onFormSubmit = (data: EventFormType) => {
    onSubmit({
      ...data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 mt-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title", { required: true })} required />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              date={field.value || new Date()}
              setDate={field.onChange}
            />
          )}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="reminder"
          control={control}
          render={({ field }) => (
            <Switch
              id="reminder"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="reminder">Set Reminder</Label>
      </div>

      <div>
        <Label htmlFor="reminderTime">Reminder Time</Label>
        <Controller
          name="reminderTime"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select reminder time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes before</SelectItem>
                <SelectItem value="15">15 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex justify-between">
        <Button type="submit">{event ? "Update Event" : "Create Event"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
