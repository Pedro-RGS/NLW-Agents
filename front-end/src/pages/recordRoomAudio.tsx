import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const params = useParams<RoomParams>();

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current?.stop();
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();
    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = response.json();
    console.log(result);
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("O seu navegador não suporta gravação de áudio");
      return;
    }

    setIsRecording(true);

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100,
        },
      });

      recorder.current = new MediaRecorder(audio, {
        mimeType: "audio/webm",
        audioBitsPerSecond: 64_000,
      });

      recorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          uploadAudio(event.data);
        }
      };

      recorder.current.onstart = () => {
        console.log("Gravação iniciada");
      };

      recorder.current.onstop = () => {
        console.log("Gravação pausada");
      };

      recorder.current.start();
    } catch (e: any) {
      alert("Algo deu errado ao tentar gravar o áudio");
    }
  }

  if (!params.roomId) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <div className="h-screen flex items-center justify-center gap-3 flex-col">
      {isRecording ? (
        <Button onClick={stopRecording}> Parar Gravação </Button>
      ) : (
        <Button onClick={startRecording}> Gravar Áudio </Button>
      )}
      {isRecording ? <p> Gravando... </p> : <p> Pausado </p>}
    </div>
  );
}
