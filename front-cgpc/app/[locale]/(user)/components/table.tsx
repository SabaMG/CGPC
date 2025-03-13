import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';

// export default function App() {
// pass the props description, specs and reviews
export default function App({
    description,
    specs,
    reviews,
}: {
    description: string;
    specs: string;
    reviews: string;
}) {
    return (
        <div className="flex flex-col px-4">
            <div className="flex w-full flex-col">
                <Tabs aria-label="Options" isVertical={true}>
                    <Tab key="Description" title="Description">
                        <Card>
                            <CardBody>
                                {description.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="specs" title="Specs">
                        <Card>
                            <CardBody>{specs}</CardBody>
                        </Card>
                    </Tab>
                    <Tab key="reviews" title="Reviews">
                        <Card>
                            <CardBody>{reviews}</CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
