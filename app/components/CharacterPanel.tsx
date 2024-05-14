import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex, Text, theme } from "@chakra-ui/react";
import { Character } from "rickmortyapi";

interface CharacterPanelProps {
    index: number;
    item: Character;
    expanded: boolean;
    }

export default function CharacterPanel({index, item, expanded}: CharacterPanelProps) {
    


    return (
        <AccordionItem>
            <AccordionButton>
              <Flex w="100%" align="left">
                <Text>{item.name}</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>Accordion 1 Content</Text>
            </AccordionPanel>
          </AccordionItem>
        )
}