        
/* Old code */    
<div className={styles.bookingContainer}>
        <Row>
            <Col>
                <Row className={styles.ticket}>

                    <Col sm={12} md={6}>
                        <img className={styles.ticketPic} src={propertyThumbnail} />
                    </Col>

                    <Col sm={12} md={6}>
                        <h2>Your Booking</h2>
                        <h4>{orderData.propertyName}</h4>
                        <h5>{nights} nights</h5>
                        <h5>From: {displayStartDate}</h5>
                        <h5>To: {displayEndDate}</h5>
                        <h1>&euro;{orderData.price}</h1>
                    </Col>

                    <Col sm={12} md={6}>
                        <h5>Payment Terms:</h5>
                        <p>If your arrival date is more than 30 days from booking date you need only pay a booking deposit of 30% although you may pay in full if you prefer. Any balance payable is due 30 days prior to arrival date.</p>

                        <h5>Standard Cancellation Terms:</h5>
                        <p>More than 30 days prior to arrival booking deposit is non refundable Within 30 days of arrival no refund</p>

                        {/* <h5>Covid-19 Pandemic Cancellation Terms:</h5>
                        <p>With the uncertainty surrounding international travel we will consider any cancellation request on it’s own merits if brought about directly as a result of Covid-19 restricitions</p> */}
                    </Col>

                </Row>
                <Row>
                    <Col>
                    <Form method="post" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <div>
                                <h3>Contact details</h3>
                            </div>
                        </Row>
                        <Row className={styles.formRow}>
                            <Col sm={3}>
                                <Form.Label>First Name</Form.Label> {errors.firstName && (<small className={styles.danger}>{errors.firstName.message}</small>)}
                                <Form.Control type="text" placeholder="Enter your first name" { ...register("firstName", {required: "* First name is required" })} />
                            </Col>
                            <Col sm={3}>
                                <Form.Label>Surname</Form.Label> {errors.surname && (<small className={styles.danger}>{errors.surname.message}</small>)}
                                <Form.Control type="text" placeholder="Enter your surname" { ...register("surname", {required: "* Surname is required" })} />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Email</Form.Label> {errors.email && (<small className={styles.danger}>{errors.email.message}</small>)}
                                <Form.Control type="email" placeholder="Your email address"
                                { ...register("email", {required: "* Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: " *Invalid email address",
                                  }})} />
                            </Col>
                        </Row>
                        <Row className={styles.formRow}>
                            <Col sm={6}>
                                <Form.Label>Billing Address</Form.Label> {errors.address && (<small className={styles.danger}>{errors.address.message}</small>)}
                                <Form.Control as="textarea" rows={5}  { ...register("address", {required: "* Your address is required" })}/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Phone (Full international dialling code please)</Form.Label> {errors.phone && (<small className={styles.danger}>{errors.phone.message}</small>)}
                                <Form.Control type="text" placeholder="e.g. +353 1 12345678" { ...register("phone", {required: "* Phone number is required" })} />
                                <br />
                                <Form.Label>Company name (if applicable)</Form.Label>
                                <Form.Control type="text" { ...register("company")} />
                            </Col>
                        </Row>
                        <Row className={styles.formRow}>
                            <Col sm={6}>
                                <Form.Label>Number of guests</Form.Label>
                                <Form.Control as="select" { ...register("guests")}>
                                    <option>One</option>
                                    <option>Two</option>
                                    <option>Three</option>
                                    <option>Four</option>
                                    <option>Five</option>
                                    <option>Six</option>
                                    <option>Seven</option>
                                    <option>Eight</option>
                                    <option>More than 8</option>
                                </Form.Control>
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Special requirements</Form.Label>
                                <Form.Control type="text" placeholder="e.g. Airport collection etc." { ...register("requirements")} />
                            </Col>
                        </Row>
                        <Row className={styles.formRow}>
                            <Col sm={12} className="center">
                            <div className={styles.checkboxContainer}>
                                <Form.Check className={styles.spacey} { ...register("termsread", {required: "* You must accept our terms and conditions to proceed" })}/>I have read, and agree to the <a href="#" onClick={toggleTerms}>Dublin At Home Terms & Conditions of sale</a>.<br />
                                {errors.termsread && (<small className={styles.danger}>{errors.termsread.message}</small>)}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} className={styles.marginTop}>
                                {renderPaymentButtons()}
                            </Col>
                        </Row>
                    </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Modal show={terms} backdrop="static" keyboard={false}>
                            <Modal.Header >
                            <Modal.Title>Terms &amp; Conditions of Sale</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Row>
                                    <Col>
                                        <ol className={styles.tcList}>
                                            <li>A non - refundable booking deposit equal to 30% of the reservation cost is required to secure, although bookers are offered the opportunity to pay in full if that is the preferred option. Confirmation will be issued upon receipt of deposit.  Any balance due is payable 30 days prior to arrival. Failure to pay any balance due will result in the cancellation of your reservation.
                                            Guests will be sent an email reminder with their balance payment options. Dublin At Home accepts the following payment methods: <br /><br />
                                                <ul>
                                                    <li><strong>Pay by card:</strong> <br />
                                                    An email reminder will issue including a link from where the balance can be paid
                                                    </li>

                                                    <li><strong>Cheque/postal order/bank draft:</strong> <br />
                                                    All payments should be made out to &apos;Ireland at Home&apos;, and posted to: <br />
                                                    Dublin At Home, <br />
                                                    Swallows Rest, <br />
                                                    Ballynerrin Lower, <br />
                                                    Wicklow Town, <br />
                                                    A67 WR82.
                                                    </li>

                                                    <li><strong>EFT (Electronic Funds Transfer):</strong> <br />
                                                    Please email the <a href="mailto:sales@irelandathome.com?subject=Electronic Funds Transfer Details">Reservations</a> Team for details.<br /><br />
                                                    <p>Once full payment has been received check-in instructions and directions are issued by email. If not received within 48 hours of arrival date, please contact Reservations Team.</p>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li>Utility charges are included in your rate. For stays of 28 nights or more, a fair usage policy applies. Please check with Reservations Team at time of booking.</li>

                                            <li>A damage deposit may be required. This will be highlighted 7 days prior to check-in. This will range from €150 - €1000, depending on the length of stay. This will be returned once the Cleaning Team have conducted their work and the Duty Manager is satisfied that the terms and conditions have been complied with.  Any cost of repairs following damage to property or additional cleaning, as deemed necessary by our Duty Manager, will be deducted from security deposit, with an additional charge where this is insufficient.</li>

                                            <li>Possession of your rental property should be taken between 16.00hrs and 19.00hrs and the property vacated before 10.00hrs on the morning of departure. Arrivals or departures outside of these times may be accommodated subject to prior arrangement with the Duty Manager.</li>

                                            <li>Automated email with check-in instructions will issue in the days leading up to arrival date. It is essential that the instructions be adhered to and any questions brought to our attention.</li>

                                            <li>The Proprietors are not responsible for any loss of valuables or property during your stay or left behind after departure.</li>

                                            <li>The Proprietors, Duty Manager and Officers of Failte Ireland may, at any time, visit the rental property to inspect the property or carry out any necessary repairs or maintenance.</li>

                                            <li>The number of persons stated on the reservation details must not be exceeded without first contacting the reservations office.  If the rental is based on occupancy numbers, an additional charge will be made over the number occupying the property.</li>

                                            <li>Dublin At Home act as an agent only for the rental properties. Owners/Management Company onsite reserves the right of final admittance on all bookings.</li>

                                            <li>In the unlikely event of our having to cancel your holiday/stay we will offer you the choice of a full refund of all monies paid to us or of staying in an alternative accommodation of comparable standard, if available.</li>

                                            <li>Pets, with the exception of Guide dogs, are not permitted at all properties.</li>

                                            <li>If guests behave in a disruptive manner, cause damage to property or behave in any other manner deemed unreasonable by the officer of the company, rental of the property may be terminated with no rental refund.</li>

                                            <li>Any onsite issues or complaints should be brought to the attention of the Duty Manager immediately to enable rectification without delay. Failure to notify such issues negates any subsequent requests for reimbursement.</li>

                                            <li>Any general complaints regarding your reservation should be directed to our Reservations Team 9am-8pm Monday-Friday or by email to <a href="mailto:reservations@dublinathome.com?subject=Contact Reservations">Reservations</a>. If your complaint has not been satisfactorily resolved onsite, please advise Dublin at Home as soon as possible.  Any complaints, post departure, must be notified within 24 hours of departure.</li>

                                            <li>WiFi is available in all properties as is multi-channel TV.</li>

                                            <li>Requests for cots and highchairs must be made with Dublin At Home at time of booking. Cot linen is not provided.</li>

                                            <li>Guests must be 21 years of age or more to book a property with Dublin At Home, unless an employer has reserved on an employee’s behalf.</li>

                                            <li>In the case of “Force Majeure” and Dublin At Home having to curtail, alter or cancel a reservation, the Client shall not be at liberty to maintain a claim for compensation or otherwise arising, as a consequence of, the said curtailment, alteration or cancellation of the reservation.  In these terms and conditions the term “Force Majeure” is defined as Acts of God, natural disasters, health pandemics, adverse weather conditions, fire, destruction or damage to accommodation, riots, acts of civil war, civil commotion, requisition of property, insolvency or default of any provider of the accommodation, delays due to construction, or any other reason or event which Dublin At Home acting as Agents even with all due care, could not foresee or forestall.</li>

                                            <li>Through your reservation with Dublin At Home you are agreeing to Dublin At Home sharing the details pertinent to your reservation with the accommodation provider.</li>

                                            <li>Any dispute or difference of any kind whatsoever which arises or occurs between any of the parties hereto in relation to any issue or matter arising under, out of, or in connection with this Contract shall be referred to arbitration under the Arbitration Rules of the Chartered Institute of Arbitrators – Irish Branch.  Alternatively, a claim may be pursued through the Small Claims Court.</li>

                                            <li>Whilst every care has been taken to ensure the accuracy of the information detailed on Dublin At Home’s website, we cannot accept responsibility for any errors or omissions.  All liability for loss by reliance on the information contained is hereby excluded.  In the unlikely event that there is a miscalculation of the amounts due on your booking, we will inform you immediately giving details of the correct price thereby giving you the opportunity to accept or decline your reservation based on the recalculated rate.</li>
                                        </ol>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => setTerms(false)}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Col>
        </Row>
        </div>
