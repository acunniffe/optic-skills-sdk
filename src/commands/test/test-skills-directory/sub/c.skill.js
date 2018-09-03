import {skillFixture} from "../../../../sdk-objects/testkit/test/SkillTestKit.test";

const skill3 = skillFixture()
skill3._package = 'test3'

const skill4 = skillFixture()
skill4._package = 'test4'

export const testSkill = skill3
export const testSkill2 = skill4
