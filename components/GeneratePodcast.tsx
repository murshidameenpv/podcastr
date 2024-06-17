import { GeneratePodcastProps } from "@/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ImSpinner11 } from "react-icons/im";
import useGeneratePodcast from "@/hooks/useGeneratePodcast";

const GeneratePodcast = (props: GeneratePodcastProps) => {
    const { isGenerating, generatePodcast } = useGeneratePodcast(props)
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="font-bold text-16 text-white-1">
          AI prompt to generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 text-center py-4 text-white-1 font-bold"
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              <ImSpinner11 className="animate-spin text-20 mr-4" />
              Generating
            </>
          ) : (
            "Generate Podcast"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        ></audio>
      )}
    </div>
  );
};

export default GeneratePodcast;
