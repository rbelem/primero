import * as constants from "./constants";

describe("<FieldTranslationsDialog>/components/<TranslatableOptions>- Constants", () => {
  it("should have known properties", () => {
    const clonedActions = { ...constants };

    ["NAME"].forEach(property => {
      expect(clonedActions).to.have.property(property);
      delete clonedActions[property];
    });

    expect(clonedActions).to.be.empty;
  });
});
