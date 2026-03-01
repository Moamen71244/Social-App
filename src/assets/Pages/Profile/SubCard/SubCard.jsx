import { Button, Form, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@heroui/react"
import { CameraIcon } from "lucide-react"
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { userDataContext } from "../../../Context/AuthUserData";
import { axiosInterseptor } from "../../../Components/Shared/Shared";

export default function SubCard() {
    const coverImage = useRef()
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const {setAuthUserData} = useContext(userDataContext);
    const {register,handleSubmit,reset} =useForm({
        defaultValues:{
          privacy:"public",
    
        }})
        function snedCoverImage({privacy}){
      
            if (coverImage.current.files?.[0]) {        
              const myFormData = new FormData()
              myFormData.append("cover",coverImage.current.files?.[0])
              myFormData.append("privacy",privacy)
              axiosInterseptor.put(`users/upload-cover`,myFormData).then(function(){
                setAuthUserData()
              })
            }else{
              return
            }
          }
    return (
    <>
   <Button 
        onPress={function(){            
          coverImage.current.click()
        }} isIconOnly aria-label="Take a photo" color="primary" variant="light">
        <CameraIcon />
      </Button>

      <input type="file"  onChange={onOpen}  ref={coverImage} className="hidden" />
 
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
 <Form onSubmit={handleSubmit(snedCoverImage)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center text-blue-600">Select Privacy</ModalHeader>
              <ModalBody>
                <div  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Select 
                    {...register("privacy")}
                      label="Select Your Privacy" color="default"  variant="flat">
                      <SelectItem key={"public"} >Public</SelectItem>
                      <SelectItem key={"folowers"} >Folowers</SelectItem>
                      <SelectItem key={"only_me"} >Only Me</SelectItem>           
                    </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" onPress={onClose}>
                  Save Cover
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
      </Modal>
    </>
  )
}
