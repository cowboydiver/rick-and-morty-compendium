import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, Flex, Text, theme } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box p="5" w="100vw" h="100vh" bg={theme.colors.gray[200]}>
      <Card>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Flex w="100%" align="left">
                <Text>Accordion 1</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>Accordion 1 Content</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Card>
    </Box>
  );
}
