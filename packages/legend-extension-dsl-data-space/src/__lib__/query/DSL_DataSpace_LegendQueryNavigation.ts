/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  generateExtensionUrlPattern,
  generatePath,
} from '@finos/legend-application/browser';
import {
  addQueryParametersToUrl,
  stringifyQueryParams,
} from '@finos/legend-shared';
import { generateGAVCoordinates } from '@finos/legend-storage';

export enum DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN {
  GAV = 'gav',
  DATA_SPACE_PATH = 'dataSpacePath',
  EXECUTION_CONTEXT = 'executionContext',
  RUNTIME_PATH = 'runtimePath',
}

export enum DATA_SPACE_QUERY_CREATOR_QUERY_PARAM_TOKEN {
  CLASS_PATH = 'class',
}

export enum DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN {
  GAV = 'gav',
  DATA_SPACE_PATH = 'dataSpacePath',
  TEMPLATE_QUERY_TITLE = 'templateQueryTitle',
  TEMPLATE = 'template',
  QUERY_ID = 'queryId',
}

export enum DATA_SPACE_TEMPLATE_QUERY_PROMOTION_ROUTE_PATTERN_TOKEN {
  GAV = 'gav',
  DATA_SPACE_PATH = 'dataSpacePath',
  QUERY_ID = 'queryId',
}

export type DataSpaceQueryCreatorPathParams = {
  [DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.GAV]: string;
  [DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH]: string;
  [DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.EXECUTION_CONTEXT]: string;
  [DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.RUNTIME_PATH]?: string;
};

export type DataSpaceTemplateQueryCreatorPathParams = {
  [DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.GAV]: string;
  [DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH]: string;
  [DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.TEMPLATE_QUERY_TITLE]: string;
};

export type DataSpaceTemplateQueryPromotionReviewerPathParams = {
  [DATA_SPACE_TEMPLATE_QUERY_PROMOTION_ROUTE_PATTERN_TOKEN.GAV]: string;
  [DATA_SPACE_TEMPLATE_QUERY_PROMOTION_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH]: string;
  [DATA_SPACE_TEMPLATE_QUERY_PROMOTION_ROUTE_PATTERN_TOKEN.QUERY_ID]: string;
};

export type DataSpaceQueryEditorQueryParams = {
  [DATA_SPACE_QUERY_CREATOR_QUERY_PARAM_TOKEN.CLASS_PATH]?: string | undefined;
};

export const DATA_SPACE_QUERY_ROUTE_PATTERN = Object.freeze({
  SETUP: `/dataspace`,
  CREATE: `/dataspace/:${DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.GAV}/:${DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH}/:${DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.EXECUTION_CONTEXT}/:${DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.RUNTIME_PATH}?`,
  TEMPLATE_QUERY: `/dataspace/:${DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.GAV}/:${DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH}/:${DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.TEMPLATE}/:${DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.TEMPLATE_QUERY_TITLE}`,
  PROMOTE_TEMPLATE_QUERY: `/promote-template-query/:${DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.GAV}/:${DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH}/:${DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.QUERY_ID}?`,
});

export const generateDataSpaceQuerySetupRoute = (): string =>
  generatePath(
    generateExtensionUrlPattern(DATA_SPACE_QUERY_ROUTE_PATTERN.SETUP),
    {},
  );

export const generateDataSpaceQueryCreatorRoute = (
  groupId: string,
  artifactId: string,
  versionId: string,
  dataSpacePath: string,
  executionContextKey: string,
  runtimePath?: string | undefined,
  classPath?: string | undefined,
): string =>
  addQueryParametersToUrl(
    generatePath(
      generateExtensionUrlPattern(DATA_SPACE_QUERY_ROUTE_PATTERN.CREATE),
      {
        [DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.GAV]:
          generateGAVCoordinates(groupId, artifactId, versionId),
        [DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH]:
          dataSpacePath,
        [DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.EXECUTION_CONTEXT]:
          executionContextKey,
        [DATA_SPACE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.RUNTIME_PATH]:
          runtimePath,
      },
    ),
    stringifyQueryParams({
      [DATA_SPACE_QUERY_CREATOR_QUERY_PARAM_TOKEN.CLASS_PATH]: classPath
        ? encodeURIComponent(classPath)
        : undefined,
    }),
  );

export const generateDataSpaceTemplateQueryCreatorRoute = (
  groupId: string,
  artifactId: string,
  versionId: string,
  dataSpacePath: string,
  templateQueryTitle: string,
): string =>
  generatePath(
    generateExtensionUrlPattern(DATA_SPACE_QUERY_ROUTE_PATTERN.TEMPLATE_QUERY),
    {
      [DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.GAV]:
        generateGAVCoordinates(groupId, artifactId, versionId),
      [DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH]:
        dataSpacePath,
      [DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.TEMPLATE]:
        DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.TEMPLATE,
      [DATA_SPACE_TEMPLATE_QUERY_CREATOR_ROUTE_PATTERN_TOKEN.TEMPLATE_QUERY_TITLE]:
        templateQueryTitle,
    },
  );

export const generateDataSpaceTemplateQueryPromotionRoute = (
  groupId: string,
  artifactId: string,
  versionId: string,
  dataSpacePath: string,
  queryId: string | undefined,
): string =>
  generatePath(
    generateExtensionUrlPattern(
      DATA_SPACE_QUERY_ROUTE_PATTERN.PROMOTE_TEMPLATE_QUERY,
    ),
    {
      [DATA_SPACE_TEMPLATE_QUERY_PROMOTION_ROUTE_PATTERN_TOKEN.GAV]:
        generateGAVCoordinates(groupId, artifactId, versionId),
      [DATA_SPACE_TEMPLATE_QUERY_PROMOTION_ROUTE_PATTERN_TOKEN.DATA_SPACE_PATH]:
        dataSpacePath,
      [DATA_SPACE_TEMPLATE_QUERY_PROMOTION_ROUTE_PATTERN_TOKEN.QUERY_ID]:
        queryId,
    },
  );
