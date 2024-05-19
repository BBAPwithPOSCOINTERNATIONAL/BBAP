package com.bbap.order_room.config;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LocalDateTimeAdapter extends TypeAdapter<LocalDateTime> {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Override
    public void write(JsonWriter jsonWriter, LocalDateTime localDateTime) throws IOException {
        jsonWriter.value(localDateTime != null ? localDateTime.format(formatter) : null);
    }

    @Override
    public LocalDateTime read(JsonReader jsonReader) throws IOException {
        return jsonReader != null ? LocalDateTime.parse(jsonReader.nextString(), formatter) : null;
    }
}
