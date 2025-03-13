'use client';
import React from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    User,
    DateInput,
    Input,
    Radio,
    RadioGroup,
    Button,
    Divider,
    Card,
    CardBody,
    Image,
} from '@nextui-org/react';
import { CalendarDate, parseDate } from '@internationalized/date';
import { Content } from '@/components/admin/home/content';
import { Accounts } from "@/components/admin/accounts";

import { CalendarIcon } from './CalendarIcon';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { UserIcon } from './UserIcon';

export default function Account() {
    const [selectedSection, setSelectedSection] = React.useState('settings');
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const isAdmin = true;

    const handleMenuAction = (key: any) => {
        setSelectedSection(key); // Met à jour la section sélectionnée
    };

    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-6">
            {/* Dropdown Section */}
            <div className="col-span-1 relative z-50">
                <div className="absolute top-0 left-0">
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <User
                                as="button"
                                avatarProps={{
                                    isBordered: true,
                                    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                                }}
                                className="transition-transform"
                                description="@tonyreichert"
                                name="Tony Reichert"
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="User Actions"
                            variant="flat"
                            onAction={handleMenuAction} // Gérer les clics
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-bold">Signed in as</p>
                                <p className="font-bold">@tonyreichert</p>
                            </DropdownItem>
                            <DropdownItem key="settings">
                                My Settings
                            </DropdownItem>
                            <DropdownItem key="my_orders">
                                My Orders
                            </DropdownItem>
                            <DropdownItem key="addresses">
                                My Addresses
                            </DropdownItem>
                            <DropdownItem key="configurations">
                                Configurations
                            </DropdownItem>
                            <DropdownItem key="cart_in_progress">
                                Shopping Cart in Progress
                            </DropdownItem>
                            <DropdownItem key="dashboard">
                                Dashboard
                            </DropdownItem>
                            <DropdownItem key="order_management">
                                Gestion de commande
                            </DropdownItem>
                            <DropdownItem key="payment_management">
                                Gestion de paiement
                            </DropdownItem>
                            <DropdownItem key="delivery_management">
                                Gestion de livraison
                            </DropdownItem>
                            <DropdownItem key="stock_management">
                                Gestion du stock
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            {/* Conditionally Rendered Sections */}
            {selectedSection === 'settings' && (
                
                <>
                    {/* COORDONNÉES Section */}
                    <div className="col-span-1">
                        <Card>
                            <CardBody>
                        
                                <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                    COORDONNÉES
                                </h1>
                                <form>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <RadioGroup
                                                label="Civilité"
                                                orientation="horizontal"
                                            >
                                                <Radio value="Mister">
                                                    M
                                                </Radio>
                                                <Radio value="Miss">Mme</Radio>
                                            </RadioGroup>
                                        </div>
                                        <div>
                                            <Input
                                                defaultValue="kanelrecords@gmail.com"
                                                label="Email"
                                                placeholder="Your Email"
                                                type="email"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                defaultValue="Kanel"
                                                label="Surname"
                                                placeholder="Your Surname"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <div className="relative mt-2">
                                                <DateInput
                                                    defaultValue={parseDate(
                                                        '2024-04-04',
                                                    )}
                                                    label="Date de naissance :"
                                                    labelPlacement="outside"
                                                    placeholderValue={
                                                        new CalendarDate(
                                                            1995,
                                                            11,
                                                            6,
                                                        )
                                                    }
                                                    startContent={
                                                        <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                    }
                                                />
                                                <i className="fas fa-calendar-alt absolute right-3 top-3 text-gray-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <Input
                                                defaultValue="Eyer"
                                                label="Name"
                                                placeholder="Your name"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                defaultValue="RoulerALaKanel"
                                                label="Pseudo"
                                                placeholder="Your Pseudo"
                                                type="text"
                                            />
                                            <p className="text-gray-400 text-sm mt-1">
                                                Votre pseudo est utilisé lorsque
                                                vous déposez un avis.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center mt-6">
                                        <Button color="danger">VALIDER</Button>
                                    </div>
                                </form>
                        
                            </CardBody>
                        </Card>
                    </div>

                    {/* CHANGER DE MOT DE PASSE Section */}
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                CHANGER DE MOT DE PASSE
                            </h1>
                            <form>
                                <div className="flex flex-col gap-y-6">
                                    <div>
                                        <Input
                                            endContent={
                                                <button
                                                    aria-label="toggle password visibility"
                                                    className="focus:outline-none"
                                                    type="button"
                                                    onClick={toggleVisibility}
                                                >
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            label="Password"
                                            placeholder="Enter your password"
                                            type={isVisible ? 'text' : 'password'}
                                            variant="bordered"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            endContent={
                                                <button
                                                    aria-label="toggle password visibility"
                                                    className="focus:outline-none"
                                                    type="button"
                                                    onClick={toggleVisibility}
                                                >
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            label="Password"
                                            placeholder="Enter your password"
                                            type={isVisible ? 'text' : 'password'}
                                            variant="bordered"
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-6">
                                    <Button color="danger">VALIDER</Button>
                                </div>
                                <Divider className="my-4" />
                                <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                    SUPPRESSION DE COMPTE
                                </h1>
                                <div className="text-center mt-6">
                                    <Button
                                        color="danger"
                                        startContent={
                                            <UserIcon
                                                filled
                                                height="24"
                                                label="User Icon"
                                                size="24"
                                                width="24"
                                            />
                                        }
                                        variant="bordered"
                                    >
                                        Delete user
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </>
            )}

            {selectedSection === 'my_orders' && (
                <>
                <div className="col-span-1 relative">
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                My Orders
                            </h1>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                X Order un Progress
                            </h1>
                            <Card>
                                <CardBody>
                                    <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                        Template Orders
                                    </h1>
                                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6">
                                        <div className="col-span-1 relative">
                                            <Image
                                                width={240}
                                                alt="NextUI Fruit Image with Zoom"
                                                src="https://nextui.org/images/fruit-1.jpeg" />
                                        </div>
                                        <div className="col-span-1 relative gap-6">
                                            <h1 >Date : 24/12/2024</h1>
                                            <h1 >Price: 1500$</h1>
                                            <h1 >Price: 1500$</h1>
                                            <h1 >etc</h1>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-span-1 relative">
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                Orders History
                            </h1>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                X Order Done
                            </h1>
                            <Card>
                                <CardBody>
                                    <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                        Template Orders
                                    </h1>
                                    <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6">
                                        <div className="col-span-1 relative">
                                            <Image
                                                width={240}
                                                alt="NextUI Fruit Image with Zoom"
                                                src="https://nextui.org/images/fruit-1.jpeg" />
                                        </div>
                                        <div className="col-span-1 relative gap-6">
                                            <h1 >Date : 24/12/2024</h1>
                                            <h1 >Price: 1500$</h1>
                                            <h1 >Price: 1500$</h1>
                                            <h1 >etc</h1>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>
                    
                </div>
                </>
                
                
            )}

            {selectedSection === 'addresses' && (
                <div className="col-span-2">
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                My Addresses
                            </h1>
                            <form>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <Input
                                            label="Address Line 1"
                                            placeholder="Enter your address"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Address Line 2"
                                            placeholder="Enter additional details"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="City"
                                            placeholder="Enter your city"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Postal Code"
                                            placeholder="Enter postal code"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-6">
                                    <Button color="primary">Save Address</Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>

            )}

            {selectedSection === 'configurations' && (
                <div className='col-span-2'>
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                Configurations
                            </h1>
                            {/* Content for Configurations */}
                        </CardBody>
                    </Card>
                </div>
            )}

            {selectedSection === 'cart_in_progress' && (
                <div className='col-span-2'>
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                Shopping Cart in Progress
                            </h1>
                            {/* Replace with shopping cart items */}
                            <ul className="text-gray-300">
                                <li>Product 1 - Quantity: 2</li>
                                <li>Product 2 - Quantity: 1</li>
                                <li>Product 3 - Quantity: 5</li>
                            </ul>
                        </CardBody>
                    </Card>
                </div>
            )}
             {selectedSection === 'dashboard' && (
                <div className="col-span-3">
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                Dashboard
                            </h1>
                            <Content />
                            <p className="text-gray-300 text-center">
                                Aperçu des statistiques principales et indicateurs clés.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            )}

            {selectedSection === 'order_management' && (
                <div className="col-span-3">
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                Gestion de commande
                            </h1>
                            <Accounts />
                            <p className="text-gray-300">
                                Liste des commandes en attente, en cours ou terminées.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            )}

            {selectedSection === 'payment_management' && (
                <div className="col-span-2">
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                Gestion de paiement
                            </h1>
                            <p className="text-gray-300">
                                Historique des paiements, remboursements, et autres transactions.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            )}

            {selectedSection === 'delivery_management' && (
                <div className="col-span-2">
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                Gestion de livraison
                            </h1>
                            <p className="text-gray-300">
                                Suivi des livraisons en cours, à préparer ou terminées.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            )}

            {selectedSection === 'stock_management' && (
                <div className="col-span-2">
                    <Card>
                        <CardBody>
                            <h1 className="text-center text-2xl font-semibold text-gray-200 mb-6">
                                Gestion du stock
                            </h1>
                            <p className="text-gray-300">
                                Ajout, modification, ou suppression de produits en stock.
                            </p>
                        </CardBody>
                    </Card>
                </div>
            )}
            
        </div>
    );
}
