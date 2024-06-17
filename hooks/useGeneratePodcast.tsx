import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {useUploadFiles} from '@xixixao/uploadstuff/react' 
import { useToast } from "@/components/ui/use-toast";

const useGeneratePodcast = (props: GeneratePodcastProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const getPodcastAudio = useAction(api.openai.generateAudioAction);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    //to upload generated audio url to the convex database
    const { startUpload } = useUploadFiles(generateUploadUrl)
    const getAudioUrl = useMutation(api.podcast.getUrl)
    const { toast } = useToast();

  const generatePodcast = async () => {
      setIsGenerating(true);
      props.setAudio("");
      if (!props.voicePrompt) {
          toast({
            title: "Please provide a voice type to generate a podcast",
          });
          return setIsGenerating(false)
      }
      
      try {
        //   returns a buffer of the audio by convex
          const response = await getPodcastAudio({
              voice: props.voiceType,
              input:props.voicePrompt,
          })
          const blob = new Blob([response],{type:'audio/mpeg'})
          const fileName = `podcast-${uuidv4()}.mp3`;
          const file = new File([blob], fileName, { type: 'audio/mpeg' })
          const uploaded = await startUpload([file])
          const storageId = (uploaded[0].response as any).storageId
          props.setAudioStorageId(storageId)
          const audioUrl = await getAudioUrl({ storageId })
          console.log(audioUrl,'oooooooooooooooooooo')
          props.setAudio(audioUrl!)
          setIsGenerating(false)
           toast({
             title: "Podcast generated successfully",
           });
      } catch (error) {
          console.log(`Error generating podcast`, error);
           toast({
               title: "Error creating podcast",
               variant:"destructive"
           });
          setIsGenerating(false)
      }
  };

  return {
    isGenerating,
    generatePodcast,
  };
};

export default useGeneratePodcast;
