import { useCalculateContext } from "@/utils/configs/displays/CalculateContext";
import DashboardCard from "./DashboardCard";
import Icon from "@/components/ui/commons/Icon";
import { FaStar } from "react-icons/fa";
import { FormatToRupiahUtil } from "@/utils/helpers/FormatToRupiahUtil";
import Button from "@/components/ui/commons/Button";
import { FormatDateUtil } from "@/utils/helpers/FormatDateUti";

const ResultCard = () => {
  const { data } = useCalculateContext();

  const handlePrint = () => {
    const printContent = document.getElementById(
      "internalResultTable",
    ).outerHTML;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.open();

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (e) {
          console.log("Unable to access stylesheet: ", e);
          return "";
        }
      })
      .join("\n");

    printWindow.document.write(`
        <html>
            <head>
                <title>Print</title>
                <style>
                    /* Menyertakan semua gaya CSS */
                    ${styles}
                </style>
            </head>
            <body onload="window.print(); window.close();">
                ${printContent}
            </body>
        </html>
    `);
    printWindow.document.close();
  };

  const handlePrintCustomer = () => {
    const table = document.getElementById("internalResultTable");
    const rows = table.querySelectorAll(
      "tbody tr.b2c, tbody tr td.hotelMakkah, tbody tr td.hotelMadinah, tbody tr td.maskapai",
    );

    const newTable = document.createElement("table");
    newTable.className = table.className;
    newTable.innerHTML = `
      <table class="styled-table">
        <tbody></tbody>
      </table>
    `;

    const newTbody = newTable.querySelector("tbody");
    rows.forEach((row) => {
      newTbody.appendChild(row.cloneNode(true));
    });

    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (e) {
          console.log("Unable to access stylesheet: ", e);
          return "";
        }
      })
      .join("\n");

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(`
        <html>
            <head>
                <title>Print</title>
                <style>
                    /* Menyertakan semua gaya CSS */
                    ${styles}
                </style>
            </head>
            <body onload="window.print(); window.close();">
                ${newTable.outerHTML}
            </body>
        </html>
    `);
    printWindow.document.close();
  };

  const addEventListeners = () => {
    const someElement = document.getElementById("someElementId");
    if (someElement) {
      someElement.addEventListener("click", () => {});
    }
  };

  window.onload = addEventListeners;

  return (
    <>
      <DashboardCard
        className="col-span-1 md:col-span-2"
        children={
          <>
            {data ? (
              <>
                <div className="flex flex-col gap-2" id="internalResultTable">
                  <h4 className="text-center font-bold">
                    Umroh <br></br> Muhibah Buana Utama
                  </h4>
                  <p className="text-end">
                    Tanggal dikeluarkan: {FormatDateUtil(new Date())}
                  </p>
                  <table className="styled-table table border-spacing-y-4 text-gray-600 dark:text-gray-400">
                    <thead>
                      <tr>
                        <th colSpan={2}></th>
                        <th>Quad</th>
                        <th>Trp</th>
                        <th>Dbl</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* hotel makkah */}
                      <tr>
                        <td colSpan={2} className="hotelMakkah">
                          <div className="block">
                            <div className="flex items-center gap-1">
                              <span className="small">Makkah</span>

                              <Icon
                                name={FaStar}
                                size={12}
                                className="text-yellow-300 dark:text-yellow-300"
                              />
                              <span className="small">
                                {data.hotelMakkah.rating}
                              </span>
                            </div>
                            <h6>{data.hotelMakkah.name}</h6>
                            <span className="small">
                              {data.nightInMakkah} Malam
                            </span>
                          </div>
                        </td>
                        {data.ratesHotelMakkah.map((rate, index) => (
                          <td key={index}>
                            {rate.price}
                            <br />
                            <span className="priceActive">
                              {" "}
                              {data.ratesPerPersonMakkah[index]?.price}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* hotel madinah */}
                      <tr>
                        <td colSpan={2} className="hotelMadinah">
                          <div className="block">
                            <div className="flex items-center gap-1">
                              <span className="small">Madinah</span>

                              <Icon
                                name={FaStar}
                                size={12}
                                className="text-yellow-300 dark:text-yellow-300"
                              />
                              <span className="small">
                                {" "}
                                {data.hotelMadinah.rating}
                              </span>
                            </div>
                            <h6>{data.hotelMadinah.name}</h6>
                            <span className="small">
                              {" "}
                              {data.nightInMadinah} Malam
                            </span>
                          </div>
                        </td>
                        {data.ratesHotelMadinah.map((rate, index) => (
                          <td key={index}>
                            {rate.price}
                            <br />
                            <span className="priceActive">
                              {" "}
                              {data.ratesPerPersonMadinah[index]?.price}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* jumlah sar */}
                      <tr>
                        <td colSpan={2}>Jumlah Sar</td>
                        {data.totalRatesHotelSar.map((rate, index) => (
                          <td key={index}>{rate.price}</td>
                        ))}
                      </tr>

                      {/* sar to dollar */}
                      <tr>
                        <td colSpan={2}>Sar To Dollar</td>
                        {data.totalRatesHotelUsd.map((rate, index) => (
                          <td key={index}>
                            <span className="priceActive">{rate.price} </span>
                          </td>
                        ))}
                      </tr>

                      {/* visa */}
                      <tr>
                        <td colSpan={2}>
                          Visa{" "}
                          <span className="priceActive">
                            [{data.countVisa}]
                          </span>
                        </td>
                        {Array(3)
                          .fill()
                          .map((_, index) => (
                            <td key={index}>{data.priceVisa}</td>
                          ))}
                      </tr>

                      {/* la */}
                      <tr>
                        <td colSpan={2}>
                          LA{" "}
                          <span className="priceActive">[{data.countLa}]</span>
                        </td>
                        {Array(3)
                          .fill()
                          .map((_, index) => (
                            <td key={index}>{data.priceLa}</td>
                          ))}
                      </tr>

                      {/* jumlah dollar */}
                      <tr>
                        <td colSpan={2}>Jumlah Dollar</td>
                        {data.totalRatesSettingUsd.map((rate, index) => (
                          <td key={index}>{rate.price}</td>
                        ))}
                      </tr>

                      {/* dollar to idr */}
                      <tr>
                        <td colSpan={2}>Dollar To IDR</td>
                        {data.totalRatesSettingIdr.map((rate, index) => (
                          <td key={index} className="px-2">
                            <span className="priceActive">
                              {FormatToRupiahUtil(rate.price).replace(
                                /Rp\s*/g,
                                "",
                              )}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* maskapai */}
                      <tr>
                        <td colSpan={2} className="maskapai">
                          Maskapai{" "}
                          <span className="priceActive">
                            [ {data.codeAirline}]
                          </span>
                        </td>
                        {Array(3)
                          .fill()
                          .map((_, index) => (
                            <td key={index}>
                              {FormatToRupiahUtil(data.priceAirline).replace(
                                /Rp\s*/g,
                                "",
                              )}
                            </td>
                          ))}
                      </tr>

                      {/* lokal office */}
                      <tr>
                        <td colSpan={2}>Lokal Kantor</td>
                        {Array(3)
                          .fill()
                          .map((_, index) => (
                            <td key={index}>
                              {FormatToRupiahUtil(data.localOffice).replace(
                                /Rp\s*/g,
                                "",
                              )}
                            </td>
                          ))}
                      </tr>

                      {/* total net */}
                      <tr>
                        <td colSpan={2}>Total Net</td>
                        {data.totalNets.map((rate, index) => (
                          <td key={index}>
                            <span className="priceActive">
                              {" "}
                              {FormatToRupiahUtil(rate.price).replace(
                                /Rp\s*/g,
                                "",
                              )}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* foc ustad */}
                      <tr>
                        <td colSpan={2}>
                          FOC Ustad{" "}
                          <span className="priceActive">
                            [{data.countFocUstad}]
                          </span>
                        </td>
                        {data.focUstads.map((rate, index) => (
                          <td key={index}>
                            {FormatToRupiahUtil(rate.price).replace(
                              /Rp\s*/g,
                              "",
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* foc tl */}
                      <tr>
                        <td colSpan={2}>
                          FOC Tl{" "}
                          <span className="priceActive">
                            [{data.countFocUstad}]
                          </span>
                        </td>
                        {data.focTls.map((rate, index) => (
                          <td key={index}>
                            {FormatToRupiahUtil(rate.price).replace(
                              /Rp\s*/g,
                              "",
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* fee b2b */}
                      <tr>
                        <td colSpan={2}>Fee B2B</td>
                        {Array(3)
                          .fill()
                          .map((_, index) => (
                            <td key={index}>
                              {FormatToRupiahUtil(data.b2b).replace(
                                /Rp\s*/g,
                                "",
                              )}
                            </td>
                          ))}
                      </tr>

                      {/* b2b */}
                      <tr>
                        <td colSpan={2}>
                          <span className="priceActive"># B2B</span>
                        </td>
                        {data.b2bs.map((rate, index) => (
                          <td key={index}>
                            <span className="priceActive">
                              {FormatToRupiahUtil(rate.price).replace(
                                /Rp\s*/g,
                                "",
                              )}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* fee b2c */}
                      <tr>
                        <td colSpan={2}>Fee B2C</td>
                        {Array(3)
                          .fill()
                          .map((_, index) => (
                            <td key={index}>
                              {FormatToRupiahUtil(data.b2c).replace(
                                /Rp\s*/g,
                                "",
                              )}
                            </td>
                          ))}
                      </tr>

                      {/* b2c */}
                      <tr className="b2c">
                        <td colSpan={2}>
                          <span className="priceActive"># B2C</span>
                        </td>
                        {data.b2cs.map((rate, index) => (
                          <td key={index}>
                            <span className="priceActive">
                              {FormatToRupiahUtil(rate.price).replace(
                                /Rp\s*/g,
                                "",
                              )}
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-6 flex w-full justify-end gap-1 print:hidden">
                    <Button
                      type="button"
                      variant="quaternary"
                      onClick={handlePrint}
                      children="Cetak Internal"
                    />
                    <Button
                      type="button"
                      onClick={handlePrintCustomer}
                      children="Cetak Customer"
                    />
                  </div>
                </div>
              </>
            ) : (
              <p>Lengkapi data terlebih dahulu...</p>
            )}
          </>
        }
      />
    </>
  );
};

export default ResultCard;
